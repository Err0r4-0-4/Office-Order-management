import React from "react";
import styles from "./Spinner.module.css";
import Backdrop from "./Backdrop";

const Spinner = (props) => {
  return (
    <div>
      <Backdrop show={true} />
      <div className={styles["spinner"]}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};

export default Spinner;
