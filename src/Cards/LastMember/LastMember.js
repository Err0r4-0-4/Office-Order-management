import React, { useState } from "react";
import styles from "./LastMember.module.css";
const Member = (props) => {
  const onScheduleHandler = () => {
    console.log(props.id);
  };

  return (
    <div
      onClick={() => props.setFamily(props.name, props.id)}
      className={styles.member}
    >
      {props.name}
    </div>
  );
};

export default Member;
