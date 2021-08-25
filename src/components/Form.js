import React, { useState } from "react";
import firebase from "../util/firebase";
import UploadImage from "./UploadImage";
import { v4 as uuid } from "uuid";
import styles from "./Form.module.css";
const db = firebase.firestore();
var storageRef = firebase.storage().ref();
export default function Form() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState({});
  const [addons, setAddons] = useState([]);
  const [orderUploaded, setOrderUploaded] = useState(false);
  //const [imageUrl, setImageUrl] = useState("");

  const uploadForm = async (e) => {
    console.log("DownloadURL");
    try {
      e.preventDefault();
      const id = uuid();
      var mountainsRef = storageRef.child(id);
      await mountainsRef.put(file);
      let DownloadURL = await storageRef.child(id).getDownloadURL();

      console.log(DownloadURL);
      console.log(title);
      console.log(file);
      let orders = await db.collection("orders").add({
        title: title,
        imageUrl: DownloadURL,
      });
      setOrderUploaded(true);
      setTitle("");
      setFile({});
      console.log("order added to ORDER collection");
    } catch (error) {
      console.log(error);
    }

    //console.log(DownloadURL);
    // let snap = db.collection("orders").add({

    //  })
  };

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  // const createTodo = () => {
  //   const todoRef = firebase.database().ref("Todo");
  //   const todo = {
  //     title,
  //     complete: false,
  //     imageUrl,
  //   };

  //   todoRef.push(todo);
  // };
  return (
    <div>
      <form onSubmit={uploadForm}>
        <h1>Upload image</h1>
        <input
          type="text"
          placeholder="Title"
          onChange={handleOnChange}
          value={title}
        />
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className={styles.drag}
          placeholder="Drop files here"
        />

        <br />
        {/* <input
          type="text"
          placeholder="Addons"
          onChange={handleOnChange}
          value={title}
        /> */}

        <div className={styles.add}>
          <ul className={styles.flexadd}>
            <li className={styles.addons}>Private</li>
            <li className={styles.addons}>Public</li>
            <li className={styles.addons}>Mandatory</li>
            <li className={styles.addons}>Hidden</li>
            <li className={styles.addons}>Student</li>
            <li className={styles.addons}>Abcd</li>
          </ul>
        </div>
        <br />

        <button>Upload Order </button>
      </form>
      {orderUploaded ? (
        <p style={{ color: "green", fontWeight: "bold" }}>
          Order Uploaded Successfully!
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
