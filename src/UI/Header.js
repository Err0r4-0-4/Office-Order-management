import React from "react";
import firebase from "firebase";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import img1 from ".././Images/inst.png";
import { useSelector, useDispatch } from "react-redux";
import { Authactions } from "../store/Auth-login";
const Header = () => {
  const con = useSelector((state) => state.isSignedIn);
  const role = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const signout = () => {
    dispatch(Authactions.toggle());

    firebase.auth().signOut();
  };
  console.log(con);
  return (
    <React.Fragment>
      <div className={styles.pre}></div>
      <div className={styles.header}>
        <div className={styles.name}>
          <h1>Office Order Manager</h1>
        </div>
        <ul>
          <li>
            <NavLink
              to="/home"
              activeClassName={styles.active}
              className={styles.link}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/neworder"
              activeClassName={styles.active}
              className={styles.link}
            >
              New Order
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/prevorder"
              activeClassName={styles.active}
              className={styles.link}
            >
              Previous
            </NavLink>
          </li>
          {/* <li className={styles.circleli}>
            <div className={styles.circle}>
              <img src={img1} className={styles.circleimg} alt="logo" />
            </div>
          </li> */}
          <li>
            <NavLink
              to="/about"
              activeClassName={styles.active}
              className={styles.link}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/iiitv"
              activeClassName={styles.active}
              className={styles.link}
            >
              IIIT V
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/out"
              activeClassName={styles.active}
              className={styles.link}
              onClick={signout}
            >
              Signout
            </NavLink>
          </li>
        </ul>
        {/* <div className={styles.role}> {role}</div> */}
      </div>
    </React.Fragment>
  );
};

export default Header;
