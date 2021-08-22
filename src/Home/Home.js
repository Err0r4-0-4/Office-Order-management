import React from "react";
import styles from "./Home.module.css";
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
          <p>Home</p>
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
