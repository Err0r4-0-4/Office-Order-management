import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import img1 from ".././Images/inst.png";
const header = () => {
  return (
    <React.Fragment>
      <div className={styles.pre}></div>
      <div className={styles.header}>
        <ul>
          <li>
            <NavLink
              to="#"
              activeClassName={styles.active}
              className={styles.link}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              activeClassName={styles.active}
              className={styles.link}
            >
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="#"
              activeClassName={styles.active}
              className={styles.link}
            >
              IIIT V
            </NavLink>
          </li>
          <li className={styles.circleli}>
            <div className={styles.circle}>
              <img src={img1} className={styles.circleimg} />
            </div>
          </li>
          <li>
            <NavLink
              to="#"
              activeClassName={styles.active}
              className={styles.link}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              activeClassName={styles.active}
              className={styles.link}
            >
              Faculty
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              activeClassName={styles.active}
              className={styles.link}
            >
              Signout
            </NavLink>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default header;
