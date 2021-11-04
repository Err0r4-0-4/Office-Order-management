import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { GoMarkGithub, GoMail } from "react-icons/go";
import { FaLinkedinIn, FaSearchLocation } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdCall, MdLocationSearching } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import firebase from "firebase";
import styles from "./Header.module.css";
import img1 from ".././Images/inst.png";
import { useSelector, useDispatch } from "react-redux";
import { Authactions } from "../store/Auth-login";
const Header = () => {
  const [open, setOpen] = useState(false);
  const clickhandler = () => {
    setOpen(!open);
  };

  const [over, setover] = useState(false);
  const func1 = () => {
    setover(!over);
  };

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

        <div className={styles.burger} onClick={clickhandler}>
          <div className={open ? styles.lines4 : styles.lines1}></div>
          <div className={open ? styles.lines5 : styles.lines2}></div>
          <div className={open ? styles.lines6 : styles.lines3}></div>
        </div>
      </div>

      <div className={open ? styles.burgermenuo : styles.burgermenuc}>
        <div className={open ? styles.menuo : styles.menuc}>
          <ul className={styles.flex2}>
            <li>
              <NavLink
                to="/home"
                activeClassName={styles.active2}
                onClick={clickhandler}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/neworder"
                activeClassName={styles.active2}
                onClick={clickhandler}
              >
                New Order
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/prevorder"
                activeClassName={styles.active2}
                onClick={clickhandler}
              >
                Previous Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                activeClassName={styles.active2}
                onClick={clickhandler}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/iiitv"
                activeClassName={styles.active2}
                onClick={clickhandler}
              >
                IIIT Vadodara
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/iiitv"
                activeClassName={styles.active2}
                onClick={signout}
              >
                Signout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;