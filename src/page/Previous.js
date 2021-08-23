import React, { useEffect, useState, useRef } from "react";
import Showimage from "../components/Showimage";
import styles from "./Previous.module.css";
import firebase from "../util/firebase";
let db = firebase.firestore();

const Previous = () => {
  const [orders, setOrders] = useState([]);
  const [showorders, setshoworders] = useState(null);
  const search = useRef("");
  const submitHandler = (e) => {
    e.preventDefault();
    setshoworders(
      orders.filter((e) =>
        e.props.children[1].props.children.includes(search.current.value)
      )
    );
  };
  useEffect(() => {
    async function getData(params) {
      console.log("in Use Effect!");
      let docSnap = await (
        await db.collection("orders").get()
      ).docs.map((doc) => (
        <div className={styles.box}>
          <img src={doc.data().imageUrl} className={styles.img}></img>

          <h2 className={styles.title}>{doc.data().title}</h2>
          <a href={doc.data().imageUrl} target="_blank" className={styles.link}>
            Jump to Link
          </a>
        </div>
      ));
      console.log(docSnap);
      setOrders(docSnap);
    }
    getData();
  }, []);

  return (
    <div>
      <div className={styles.search}>
        <h1></h1>
        <form onSubmit={submitHandler}>
          <input type="text" ref={search} />
          <button>Search</button>
        </form>
        <h1>Previous Orders</h1>
      </div>
      <div className={styles.flex}>
        {/* <Showimage /> */}
        {showorders ? showorders : orders}
      </div>
    </div>
  );
};

export default Previous;
