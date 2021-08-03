import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Footer from "../../UI/Footer";
import Header from "../../UI/Header";
firebase.initializeApp({
  apiKey: "AIzaSyCHN6FigRX-JqneyPyJ0qgqILlJjogpuJ8",
  authDomain: "office-order-management.firebaseapp.com",
});

class Auth extends Component {
  state = {
    isSignedIn: false,
  };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
      console.log(firebase.auth().currentUser.token);
    });
  };

  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <span>
            <Header />
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
            <Footer />
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default Auth;
