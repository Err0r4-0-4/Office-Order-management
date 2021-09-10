import React, { useEffect, useState, useRef } from "react";
import Showimage from "../components/Showimage";
import styles from "./Previous.module.css";
import firebase from "../util/firebase";
let db = firebase.firestore();

const Previous = () => {
  const [orders, setOrders] = useState([]);
  const [showorders, setshoworders] = useState(null);
  const [search, setsearch] = useState("");
  const [order, setorder] = useState([]);
  const [previewURL, setPreviewURL] = useState("");

  const submitHandler = (e) => {
    console.log(orders);
    setsearch(e.target.value);
    let ser = e.target.value.toLowerCase();
    console.log(e.target.value);
    setshoworders(
      orders.filter((e) => e.props.children[1].props.children.includes(ser))
    );
  };
  const preViewHandler = (e) => {
    console.log(e);
    setPreviewURL(e);
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
          <button
            onClick={() => preViewHandler(doc.data().imageUrl)}
            target="_top"
            className={styles.link}
          >
            Jump to Link
          </button>
          <span className={styles.addons}>{doc.data().addons}</span>
        </div>
      ));
      let a = await db.collection("orders").get();
      a.docs.map((d) => order.push(d.data()));
      // console.log(docSnap);
      setOrders(docSnap);
    }
    getData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div className={styles.search}>
        <input type="text" value={search} onChange={submitHandler} />

        <h1>Previous Orders</h1>
        <div className={styles.flex}>
          {/* <Showimage /> */}
          {showorders ? showorders : orders}
        </div>
      </div>

      <div className={styles.previewMain}>
        <iframe
          className={styles.preview}
          src={previewURL}
          title="test"
          style={{ border: "1px solid black" }}
        />
      </div>
    </div>
  );
};

export default Previous;
