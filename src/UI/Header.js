import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMail } from "react-icons/fi";
import { GoMarkGithub, GoMail } from "react-icons/go";
import { FaLinkedinIn, FaSearchLocation } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdCall, MdLocationSearching } from "react-icons/md";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import firebase from "firebase";
import styles from "./Header.module.css";
import img1 from ".././Images/inst.png";
import { useSelector, useDispatch } from "react-redux";
import { Authactions } from "../store/Auth-login";

let config = {
  headers: {
    token: localStorage.getItem("token"),
  },
};

const Header = () => {
  const con = useSelector((state) => state.isSignedIn);
  const role = useSelector((state) => state.isReg);
  const dispatch = useDispatch();

  console.log(role);

  useEffect(() => {
    const data = {
      token: localStorage.getItem("token"),
    };

    console.log(data);

    axios
      .post(
        "https://office-order-backend.herokuapp.com/office/isRegistrar",
        data,
        config
      )
      .then(async (res) => {
        console.log(res.data.isRegistrar);
        ////////////////////////////////////////////////////////////////////
        dispatch(Authactions.assignRole( res.data.isRegistrar
          ));
        console.log("res" , res.data.isRegistrar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const clickhandler = () => {
    setOpen(!open);
  };

  const [over, setover] = useState(false);
  const func1 = () => {
    setover(!over);
  };

  const signout = () => {
    history.push("/");
    dispatch(Authactions.toggle());
    firebase.auth().signOut();
    localStorage.removeItem("token");
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
          {role ?
          <li>
             
              <NavLink
                to="/neworder"
                activeClassName={styles.active}
                className={styles.link}
              >
                New Order
                {console.log(role)}
              </NavLink>
            
          </li>
 : null}
          <li>
            <NavLink
              to="/prevorder"
              activeClassName={styles.active}
              className={styles.link}
            >
              View Orders
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
            <a
              href="http://www.iiitvadodara.ac.in/"
              className={styles.link}
              target="_blank"
            >
              IIIT V
            </a>
          </li>
          <li>
            <NavLink to="/" className={styles.link} onClick={signout}>
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

            {role ? 
             <li>
             <NavLink
               to="/neworder"
               activeClassName={styles.active2}
               onClick={clickhandler}
             >
               New Order
             </NavLink>
           </li> : null}
           
            <li>
              <NavLink
                to="/prevorder"
                activeClassName={styles.active2}
                onClick={clickhandler}
              >
                View Orders
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
              <a href="http://www.iiitvadodara.ac.in/" target="_blank">
                IIIT V
              </a>
            </li>

            <li>
              <NavLink to="/" onClick={signout}>
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
