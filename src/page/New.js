import React from "react";
import styles from "./New.module.css";
import firebase from "firebase";
import Form from "../components/Form";
import Spinner from "../UI/Spinner";
import img from "../Images/R.jpg";
const New = () => {
  let s = "Student";
  //   if (role == "student") s = "Student";
  //   if (role == "staff") s = "Staff";
  //   if (role == "registrar") s = "Registrar";
  return (
    <div className={styles.new}>
      <div className={styles.div1}>
        <div className={styles.per}>
          <div className={styles.back}></div>
          <img alt="profile picture" src={img} className={styles.img} />
          <div className={styles.personal}>
            <p className={styles.nameroll}>Registrar</p>
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
              Registrar at Indian Institute of Information Technology Vadodara.
            </p>
            <p className={styles.small}>{firebase.auth().currentUser.email}</p>
            {/* <p className={styles.small}>
              {firebase.auth().currentUser.email.substring(0, 4)} Batch
            </p> */}
          </div>
        </div>
        <div className={styles.link}>
          <p className={styles.links}>Links</p>
          <ul>
            <li>
              <a href="http://www.iiitvadodara.ac.in/">IIIT Vadodara Website</a>
            </li>
            <li>
              <a href="https://betamoodle.iiitvadodara.ac.in/">
                Moodle IIIT Vadodara
              </a>
            </li>
            <li>
              <a href="http://nptel.iiitv.ac.in/">NPTEL@ IIIT Vadodara</a>
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
