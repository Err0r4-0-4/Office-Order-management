import React, { useEffect, useState } from "react";
import { Authactions } from "../../store/Auth-login";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Footer from "../../UI/Footer";
import Home from "../../Home/Home";
import styles from "./Auth.module.css";
import { FaUserCircle } from "react-icons/fa";
import { FcSupport } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import cx from "classnames";
import Image from "../../Images/inst.png";
import Image2 from "../../Images/office.png";
import { Route } from "react-router";
import { AiFillCar, AiTwotoneMail } from "react-icons/ai";
import { FaCar, FaPhone } from "react-icons/fa";
import Modal from "../../UI/Modal";
import { Redirect } from "react-router";

import { IoLocationSharp } from "react-icons/io5";
import "firebase/firestore";

var storage = firebase.storage();
var storageRef = firebase.storage().ref();

const Auth = () => {
  const [ok, setOk] = useState(false);
  const con = useSelector((state) => state.isSignedIn);
  console.log(con);
  const role = useSelector((state) => state.member);

  const dispatch = useDispatch();
  const [icon1, setIcon1] = useState(false);
  const [icon2, setIcon2] = useState(false);
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const hideHandler = () => {
    setShowModal(false);
  };

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
          console.log("user", user);
          if (user.emailVerified) {
            localStorage.setItem("token", user.Aa);
            dispatch(Authactions.assignToken(user.Aa));
            if (
              user.email.includes("@iiitvadodara.ac.in") ||
              user.email.includes("@iiitv.ac.in")
            ) {
              setOk(true);
              dispatch(Authactions.toggle());
              console.log("heey");
              if (user.email.includes("201951073"))
                dispatch(Authactions.allocation("registrar"));
              else if (user.email.includes("201951054"))
                dispatch(Authactions.allocation("director"));
              else if (user.email.includes("201952234"))
                dispatch(Authactions.allocation("student"));
              else if (user.email.includes("201951093"))
                dispatch(Authactions.allocation("faculty"));

              setRedirect(true);
            } else {
              setShowModal(true);
              console.log("!!!!!!!");
            }
          }
          console.log(firebase.auth().currentUser.token);
        }
      });
    }, [dispatch]);
  } catch (e) {
    console.log("Error");
  }

  return (
    <div className={styles.home}>
      <Modal show={showModal} switch={hideHandler}>
        Please use your institute email to login.
      </Modal>
      {con ? (
        <span>
          <Home />
        </span>
      ) : (
        <div className={styles.div0}>
          <div className={styles.div1}>
            <div className={styles.div2}>
              <div className={styles.div4}>HELLO</div>
              {con ? (
                <div className={styles.SignInButton1}>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                    id="google"
                    className={styles.google}
                    buttonText=""
                  />
                </div>
              ) : (
                <div className={styles.SignInButton1}>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                    id="google"
                    className={styles.google}
                    buttonText=""
                  />
                </div>
              )}

              <div className={styles.div5}>
                <a href="#">Trouble Logging In ?</a>
              </div>
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

          <div className={styles.footbar}>
            <div className={styles.ins}>Office Order Managegment</div>
            <div className={styles.foot}>
              <ul className={styles.ul}>
                <li>
                  <a
                    href="https://www.google.com/maps/place/Indian+Institute+of+Information+Technology+Vadodara+(Gandhinagar+Campus)/@23.2591953,72.6481807,17z/data=!3m1!4b1!4m5!3m4!1s0x395c2c777c4b5e63:0xf2af0643c7186398!8m2!3d23.2591953!4d72.6503747"
                    target="_blank"
                  >
                    <IoLocationSharp />
                  </a>
                </li>
                <li>
                  <a
                    href="http://iiitvadodara.ac.in/howtoreach.php"
                    target="_blank"
                  >
                    <FaCar />
                  </a>
                </li>
                <li>
                  <a href="tel:+918849211679">
                    <FaPhone />
                  </a>
                </li>
                <li>
                  <a href="mailto: administration@iiitvadodara.ac.in">
                    <AiTwotoneMail />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
