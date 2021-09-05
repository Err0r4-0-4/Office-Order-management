import React from "react";
import styles from "./Home.module.css";
import firebase from "firebase";
import { Route, Switch } from "react-router";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import New from "../page/New";
import Previous from "../page/Previous";
const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/home">
          <p>{firebase.auth().currentUser.displayName}</p>

          <img
            alt="profile picture"
            src={firebase.auth().currentUser.photoURL}
          />
        </Route>
        <Route path="/neworder">
          <New />
        </Route>
        <Route path="/prevorder">
          <Previous />
        </Route>
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
