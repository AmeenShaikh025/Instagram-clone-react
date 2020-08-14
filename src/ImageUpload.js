import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";

import "./imageUpload.css";

const ImageUpload = ({ username, setOpenPost }) => {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [disableBtn, setDisableBtn] = useState(true);
  const [hideProgress, setHideProgress] = useState(true);

  const handleChange = (e) => {
    if (e.target.files[0] === undefined) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function <div className=""></div>
        setHideProgress(false);
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      (error) => {
        //Error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("posts")
              .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
              })
              .catch((error) => {
                alert(error.message);
              });

            setHideProgress(true);
            setOpenPost(false);
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      {/* I want to have... */}
      {/* Caption input */}
      {/* File picker */}
      {/* Post button */}

      <textarea
        placeholder="Enter a caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
        rows="10"
        cols="50"
      />
      <input type="file" onChange={handleChange} />
      <progress
        hidden={hideProgress}
        className="imageUpload__progress"
        value={progress}
        max="100"
      />
      <Button
        onClick={handleUpload}
        disabled={disableBtn}
        variant="outlined"
        color="primary"
      >
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
