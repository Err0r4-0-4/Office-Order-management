import React from "react";
import styles from "./New.module.css";
import Form from "../components/Form";
import TodoList from "../components/TodoList";
import UploadImage from "../components/UploadImage";
const New = () => {
  return (
    <div className={styles.new}>
      <div className={styles.add}>
        <div className={styles.upload}>
          <Form />
          <TodoList />
          <UploadImage />
        </div>
      </div>
    </div>
  );
};

export default New;
