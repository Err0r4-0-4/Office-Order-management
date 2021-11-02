import React from "react";
import styles from "./New.module.css";
import firebase from "firebase";
import Form from "../components/Form";
import Spinner from "../UI/Spinner"

const New = () => {

  return (
    <div className={styles.new}>
      <div>
        <div className={styles.per}>
          <div className={styles.back}></div>
          <img
            alt="profile picture"
            src={firebase.auth().currentUser.photoURL}
            className={styles.img}
          />
          <div className={styles.personal}>
            <p className={styles.nameroll}>
              {firebase
                .auth()
                .currentUser.displayName.substring(
                  0,
                  firebase.auth().currentUser.displayName.indexOf(" ")
                )}
            </p>
            <p className={styles.nameroll}>
              {firebase
                .auth()
                .currentUser.displayName.substring(
                  firebase.auth().currentUser.displayName.indexOf(" ") + 1,
                  firebase.auth().currentUser.displayName.length
                )
                .toLocaleLowerCase()}
            </p>
            <p className={styles.small}>
              Student at Indian Institute of Information Technology Vadodara.
            </p>
            <p className={styles.small}>201952202@iiitvadodara.ac.in</p>
            <p className={styles.small}>2019 Batch</p>
          </div>
        </div>
        <div className={styles.link}>
          <p className={styles.links}>Links</p>
          <ul>
            <li>
              <a href="#">IIIT Vadodara Website</a>
            </li>
            <li>
              <a href="#">Moodle IIIT Vadodara</a>
            </li>
            <li>
              <a href="#">SomeXYZ</a>
            </li>
          </ul>
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
