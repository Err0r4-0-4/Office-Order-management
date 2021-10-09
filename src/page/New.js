import React from "react";
import styles from "./New.module.css";
import firebase from "firebase";

import Form from "../components/Form";
//import TodoList from "../components/TodoList";
//import UploadImage from "../components/UploadImage";
const New = () => {
  return (
    <div className={styles.new}>
      <div className={styles.per}>
        <img
          alt="profile picture"
          src={firebase.auth().currentUser.photoURL}
          className={styles.img}
        />
        <div className={styles.personal}>
          <p>
            {firebase
              .auth()
              .currentUser.displayName.substring(
                0,
                firebase.auth().currentUser.displayName.indexOf(" ")
              )}
          </p>
          <p>
            {firebase
              .auth()
              .currentUser.displayName.substring(
                firebase.auth().currentUser.displayName.indexOf(" ") + 1,
                firebase.auth().currentUser.displayName.length
              )}
          </p>
        </div>
      </div>
      <div className={styles.add}>
        <div className={styles.upload}>
          <Form />
          {/* <TodoList />
          //<UploadImage /> */}
        </div>
      </div>
    </div>
  );
};

export default New;
