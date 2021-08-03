import React from "react";
import Download from ".././Images/download.png";
import styles from "./Header.module.css";
import img1 from ".././Images/inst.png";
const header = () => {
  return (
    <React.Fragment>
      <div className={styles.pre}></div>
      <div className={styles.header}>
        <ul>
          <li>Home</li>
          <li>Orders</li>

          <li>IIIT V</li>
          <li className={styles.circleli}>
            <div className={styles.circle}>
              <img src={img1} className={styles.circleimg} />
            </div>
          </li>
          <li>About</li>
          <li>Faculty</li>
          <li>Signout</li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default header;
