import React, { useEffect, useState } from "react";
import { Authactions } from "../../store/Auth-login";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Footer from "../../UI/Footer";
import Header from "../../UI/Header";
import styles from "./Auth.module.css";
import { FaUserCircle } from "react-icons/fa";
import { FcSupport } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import cx from "classnames";
import Image from "../../Images/inst.png";
import Image2 from "../../Images/office.png";
//import Upload from "../Upload/Upload";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBoh79oHjd51XNoQ9qZcY22xHEkulA75eo",
  authDomain: "test-817a8.firebaseapp.com",
  databaseURL: "https://test-817a8-default-rtdb.firebaseio.com",
  projectId: "test-817a8",
  storageBucket: "test-817a8.appspot.com",
  messagingSenderId: "92579505970",
  appId: "1:92579505970:web:90bd526ee8ac9d2cba192b",
  measurementId: "G-GPZ1PPRHMF",
});

var storage = firebase.storage();
var storageRef = firebase.storage().ref();

const Auth = () => {
  // const [state, setState] = useState({ isSignedIn: false });
  const con = useSelector((state) => state.isSignedIn);
  const role = useSelector((state) => state.member);

  const dispatch = useDispatch();
  const [icon1, setIcon1] = useState(false);
  const [icon2, setIcon2] = useState(false);
  const [file, setFile] = useState(null);
  const functionover1 = () => {
    setIcon1(true);
  };
  const functionout1 = () => {
    setIcon1(false);
  };
  const functionover2 = () => {
    setIcon2(true);
  };
  const functionout2 = () => {
    setIcon2(false);
  };
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  try {
    useEffect(() => {
      const uiConfig = {
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
          signInSuccessWithAuthResult: () => false,
        },
      };
      
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch(Authactions.toggle());
          console.log("user", user.email);
          if (user.emailVerified) {
            if (
              user.email.includes("@iiitvadodara.ac.in") ||
              user.email.includes("@iiitv.ac.in")
            ) {
              if (user.email.includes("registrar"))
                dispatch(Authactions.allocation("Registrar"));
              else if (user.email.includes("director"))
                dispatch(Authactions.allocation("Director"));
              else if (user.email.includes("20"))
                dispatch(Authactions.allocation("Student"));
              else dispatch(Authactions.allocation("Faculty"));
            }
          }
          console.log(firebase.auth().currentUser.token);
        }
      });
    }, [dispatch]);
  } catch (e) {
    console.log("Error");
  }
  console.log(con);

  let uploadFile = (event) => {
    var mountainsRef = storageRef.child(event.target.files[0].name);
    mountainsRef
      .put(event.target.files[0])
      .then((snapshot) => {
        console.log();
        console.log("Uploaded a blob or file!");
        console.log(
          `https://firebasestorage.googleapis.com/v0/b/test-817a8.appspot.com/o/${event.target.files[0].name}?alt=media`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {con ? (
        <span>
          <Header />
          <div>Signed In!</div>
          <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          <h1>
            Welcome
            {firebase.auth().currentUser.displayName}
          </h1>
          <img
            alt="profile picture"
            src={firebase.auth().currentUser.photoURL}
          />
          <input type="file" onChange={uploadFile} />
          <Footer />
        </span>
      ) : (
        <div className={styles.div0}>
          <div className={styles.upper}>
            <img src={Image} className={styles.logo} alt="logo" />
            <p>Indian Institute Of Information Technology Vadodara</p>
          </div>

          <div className={styles.div1}>
            <div className={styles.div2}>
              <div className={styles.div4}>
                <FaUserCircle className={styles.circle} />
              </div>

              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
                className={styles.google}
              />

              <div className={styles.div5}>
                <a href="#">Trouble Logging In ?</a>
              </div>
            </div>
            <div className={styles.div3}>
              <img src={Image2} alt="Office Order" className={styles.office} />
              <h1>Office</h1>
              <h1>Order</h1>
              <h1>Management</h1>
            </div>
          </div>
          <button
            className={
              icon1
                ? cx(styles.visible1, styles.icon1)
                : cx(styles.invisible1, styles.icon1)
            }
            onMouseOver={functionover1}
            onMouseOut={functionout1}
          >
            <FcSupport size={25} />
          </button>

          <button
            className={
              icon2
                ? cx(styles.visible2, styles.icon2)
                : cx(styles.invisible2, styles.icon2)
            }
            onMouseOver={functionover2}
            onMouseOut={functionout2}
          >
            <FcAbout size={25} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
