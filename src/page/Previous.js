/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import Showimage from "../components/Showimage";
import styles from "./Previous.module.css";
import firebase from "../util/firebase";
let db = firebase.firestore();

const Previous = () => {
  const [orders, setOrders] = useState([]);
  const [showorders, setshoworders] = useState(null);
  const [search, setsearch] = useState("");
  //const [order, setorder] = useState([]);
  const [ordersD, setordersD] = useState([]);
  const [previewURL, setPreviewURL] = useState("");
  const [keywords, setKeywords] = useState([]);

  // const submitHandler = (e) => {
  //   console.log(orders);
  //   setsearch(e.target.value);
  //   let ser = e.target.value.toLowerCase();
  //   console.log(e.target.value);
  //   setshoworders(
  //     orders.filter((e) => e.props.children[1].props.children.includes(ser))
  //   );
  // };
  const keywordSearch = (e) => {
    console.log(e.target.value);
    console.log(ordersD);
    let renderSearchData = ordersD.filter((od) =>
      od.keywords.includes(e.target.value)
    );
    console.log("renderSearchData", renderSearchData);
    setshoworders(
      renderSearchData.map((doc) => (
        <div className={styles.box}>
          <img src={doc.imageUrl} className={styles.img}></img>

          <h2 className={styles.title}>{doc.title}</h2>
          <button
            onClick={() => preViewHandler(doc.imageUrl)}
            target="_top"
            className={styles.link}
          >
            Jump to Link
          </button>
          <span className={styles.addons}>{doc.addons}</span>
        </div>
      ))
    );
  };
  const preViewHandler = (e) => {
    console.log(e);
    setPreviewURL(e);
  };
  useEffect(() => {
    async function getData(params) {
      console.log("in Use Effect!");
      let docData = await db.collection("orders").get();
      let data = [];
      docData.forEach((d) => data.push(d.data()));
      //data.map((doc) => doc.data());
      let docDataRender = data.map((doc) => (
        <div className={styles.box}>
          <img src={doc.imageUrl} className={styles.img}></img>

          <h2 className={styles.title}>{doc.title}</h2>
          <button
            onClick={() => preViewHandler(doc.imageUrl)}
            target="_top"
            className={styles.link}
          >
            Jump to Link
          </button>
          <span className={styles.addons}>{doc.addons}</span>
        </div>
      ));

      setOrders(docDataRender);
      setordersD(data);
      let keywords = await (
        await db.collection("keywords").doc("1sKJt3XpeYiOyQgFcFaj").get()
      ).data().keywords;
      setKeywords(
        keywords.map((keyword) => <option value={keyword}>{keyword}</option>)
      );
    }
    getData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div className={styles.search}>
        <select onChange={keywordSearch}>
          <option disabled selected value>
            {" "}
            -- select keyword --{" "}
          </option>
          {keywords}
        </select>

        <h1>Previous Orders</h1>
        <div className={styles.flex}>
          {/* <Showimage /> */}
          {showorders ? showorders : orders}
        </div>
      </div>

      <div className={styles.previewMain}>
        <iframe
          width="200px"
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
