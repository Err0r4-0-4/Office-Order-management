import React, { useState } from "react";
import firebase from "../util/firebase";
import UploadImage from "./UploadImage";
import { v4 as uuid } from "uuid";
import styles from "./Form.module.css";
const db = firebase.firestore();
var storageRef = firebase.storage().ref();
export default function Form() {
  let a = [];
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState({});
  const [orderUploaded, setOrderUploaded] = useState(false);
  //const [imageUrl, setImageUrl] = useState("");
  const [visibility, setVisibility] = useState([]);
  const [addons, setAddons] = useState([]);

  const uploadForm = async (e) => {
    console.log("DownloadURL");
    try {
      e.preventDefault();
      const id = uuid();
      var mountainsRef = storageRef.child(id);
      await mountainsRef.put(file);
      //setVisibility(a);
      console.log(visibility);
      let DownloadURL = await storageRef.child(id).getDownloadURL();

      console.log(DownloadURL);
      console.log(title);
      console.log(file);
      let orders = await db.collection("orders").add({
        title: title,
        imageUrl: DownloadURL,
        addons: addons,
        visibility: visibility,
        type: type,
      });
      console.log("Doc Id: ", orders.id);
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

  // const createTodo = () => {
  //   const todoRef = firebase.database().ref("Todo");
  //   const todo = {
  //     title,
  //     complete: false,
  //     imageUrl,
  //   };

  //   todoRef.push(todo);
  // };
  const checkboxHandler = (e) => {
    if (e.target.checked) {
      //console.log(a)
      setVisibility([...visibility, e.target.value]);
      a.push(e.target.value);
    } else {
      console.log(visibility);
      let d = [...visibility];
      let index = d.indexOf(e.target.value);
      d.splice(index, 1);
      setVisibility([...d]);
      //a.pop(e.target.value);
    }
    console.log(visibility);
  };
  const radioHandler = (e) => {
    setType(e.target.value);
  };
  return (
    <div>
      <form onSubmit={uploadForm} className={styles.form}>
        <div className={styles.one}>
          <h1>Upload image</h1>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            //value={title}
            className={styles.hundred}
          />
          <br />
        </div>
        <div className={styles.one}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className={styles.drag}
            placeholder="Drop files here"
          />
          <br />
        </div>
        <h3>Internal/External</h3>
        <div className={styles.one}>
          <span>
            <input
              type="radio"
              id="internal"
              name="ie"
              value="internal"
              onChange={radioHandler}
            />
             <label for="internal">Internal</label>
          </span>
          <span>
             {" "}
            <input
              type="radio"
              id="external"
              name="ie"
              value="external"
              onChange={radioHandler}
            />
            <label for="external">External</label>
          </span>
          <br></br>
        </div>
        <h3>Visibility</h3>
        <div className={styles.one}>
          <span>
            <input
              type="checkbox"
              id="registrar"
              name="registrar"
              value="registrar"
              onChange={checkboxHandler}
            />
            <label for="registrar"> Registrar</label>
          </span>
          <span>
            <input
              type="checkbox"
              id="faculty"
              name="faculty"
              value="faculty"
              onChange={checkboxHandler}
            />
            <label for="faculty"> Faculty</label>
          </span>
          <span>
            <input
              type="checkbox"
              id="staff"
              name="staff"
              value="staff"
              onChange={checkboxHandler}
            />
            <label for="staff"> Staff</label>
          </span>
          <span>
            <input
              type="checkbox"
              id="student"
              name="student"
              value="student"
              onChange={checkboxHandler}
            />
            <label for="student"> Student</label>
          </span>
          <br></br>
        </div>
        {/* <input
          type="text"
          placeholder="Addons"
          onChange={handleOnChange}
          value={title}
        /> */}
        <div className={styles.one}>
          <div className={styles.add}>
            <ul className={styles.flexadd}>
              <li
                className={styles.addons}
                onClick={() => addons.push("Private")}
              >
                Private
              </li>
              <li
                className={styles.addons}
                onClick={() => addons.push("Public")}
              >
                Public
              </li>
              <li
                className={styles.addons}
                onClick={() => addons.push("Mandatory")}
              >
                Mandatory
              </li>
              <li
                className={styles.addons}
                onClick={() => addons.push("Hidden")}
              >
                Hidden
              </li>
              <li
                className={styles.addons}
                onClick={() => addons.push("Student")}
              >
                Student
              </li>
              <li className={styles.addons} onClick={() => addons.push("Abcd")}>
                Abcd
              </li>
            </ul>
          </div>
          <br />
        </div>
        <button className={styles.button}>Upload Order </button>
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
