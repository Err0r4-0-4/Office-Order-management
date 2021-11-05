import React, { useEffect } from "react";
import styles from "./Home.module.css";
import firebase from "firebase";
import { Route, Switch, Redirect } from "react-router";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import New from "../page/New";
import Previous from "../page/Previous";
import Homepage from "./Homepage";
import { useHistory } from "react-router-dom";
import About from "../page/About";
const Home = () => {
  const history = useHistory();
  useEffect(() => {
    history.push("/");
  }, []);

  console.log(firebase.auth().currentUser);
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Homepage />
        </Route>
        <Route path="/neworder" exact>
          <New />
        </Route>
        <Route path="/prevorder" exact>
          <Previous />
        </Route>

        <Route path="/about" exact>
          <About />
        </Route>
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
