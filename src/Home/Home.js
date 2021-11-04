import React from "react";
import styles from "./Home.module.css";
import firebase from "firebase";
import { Route, Switch, Redirect } from "react-router";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import New from "../page/New";
import Previous from "../page/Previous";
import Homepage from "./Homepage";
const Home = () => {
  console.log(firebase.auth().currentUser);
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/home" exact>
          <Homepage />
        </Route>
        <Route path="/neworder" exact>
          <New />
        </Route>
        <Route path="/prevorder" exact>
          <Previous />
        </Route>
        <Route path="/out" exact>
          <New />
        </Route>
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
