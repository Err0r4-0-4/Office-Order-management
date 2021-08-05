import React, { useEffect } from "react";
import { Authactions } from "../../store/Auth-login";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Footer from "../../UI/Footer";
import Header from "../../UI/Header";
import styles from "./Auth.module.css";
import { FaUserCircle } from "react-icons/fa";
firebase.initializeApp({
  apiKey: "AIzaSyCHN6FigRX-JqneyPyJ0qgqILlJjogpuJ8",
  authDomain: "office-order-management.firebaseapp.com",
});

const Auth = () => {
  // const [state, setState] = useState({ isSignedIn: false });
  const con = useSelector((state) => state.isSignedIn);
  const dispatch = useDispatch();

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
          console.log("user", user);
          console.log(firebase.auth().currentUser.token);
        }
      });
    }, [dispatch]);
  } catch (e) {
    console.log("Error");
  }
  console.log(con);
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
          <Footer />
        </span>
      ) : (
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
          </div>
          <div className={styles.div3}></div>
        </div>
      )}
    </div>
  );
};

export default Auth;
