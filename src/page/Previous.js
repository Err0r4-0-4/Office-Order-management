/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import Showimage from "../components/Showimage";
import styles from "./Previous.module.css";
import firebase from "../util/firebase";
import img from "../Images/pdf.png";
import axios from "axios";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";

let db = firebase.firestore();

const Previous = () => {
  const [open, setopen] = useState(false);
  const f1 = () => {
    setopen(true);
  };
  const f2 = () => {
    setopen(!open);
  };

  const [orders, setOrders] = useState([]);
  const [showorders, setshoworders] = useState(null);
  const [search, setsearch] = useState("");
  //const [order, setorder] = useState([]);
  const [ordersD, setordersD] = useState([]);
  const [previewURL, setPreviewURL] = useState("");
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {

    console.log("fetch");

    axios
    .post("https://office-order-backend.herokuapp.com/office/keywords")
    .then( async (res) => {

      console.log(res.data.keywords);
      setKeywords(res.data.keywords.map(k=><option>{k}</option>));

      console.log(keywords);

    })
    .catch((err) => {
      console.log(err);
    });

  }, []);


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
          <img src={img} className={styles.img}></img>
          <div className={styles.inner}>
            <h4 className={styles.date}>26th, June 2021</h4>
            <h2 className={styles.title}>{doc.title}</h2>
            <button
              onClick={() => preViewHandler(doc.imageUrl)}
              target="_top"
              className={styles.link}
            >
              Preview Order
            </button>
            <button target="_top" className={styles.link}>
              Parent Order
            </button>
          </div>

        </div>
      ))
    );
  };
  const preViewHandler = (e) => {
    console.log(e);
    setPreviewURL(e);
    setopen(true);
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
          <img src={img} className={styles.img}></img>
          <div className={styles.inner}>
            <h4 className={styles.date}>26th, June 2021</h4>

            <h2 className={styles.title}>{doc.title}</h2>
            <button
              onClick={() => preViewHandler(doc.imageUrl)}
              target="_top"
              className={styles.link}
            >
              Preview Order
            </button>
            <button target="_top" className={styles.link}>
              Parent Order
            </button>
            {/* <span className={styles.addons}>{doc.addons}</span> */}
          </div>
        </div>
      ));

      setOrders(docDataRender);
      setordersD(data);
      
    }
    getData();
  }, []);
  return (
    <div className={styles.page}>
      <div className={styles.search}>
        <div className={styles.select}>
          <select onChange={keywordSearch} className={styles.sel}>
            <option selected value>
              All
            </option>
            {keywords}
          </select>
          <p>
            <span className={styles.big}>3</span> test results
          </p>
        </div>
        <h1 className={styles.h1}>Previous Orders</h1>
        <div className={open ? styles.flex2 : styles.flex}>
          {/* <Showimage /> */}
          {showorders ? showorders : orders}
        </div>
      </div>
      <div className={open ? styles.previewMain : styles.hid}>
        <div className={styles.close}>
          <iframe
            className={styles.preview}
            src={previewURL}
            title="test"
            style={{ border: "1px solid black" }}
          />

          <div
            className={open ? styles.closebut : styles.closebut2}
            onClick={f2}
          >
            {open ? (
              <AiOutlineClose size={25} color="#fff" />
            ) : (
              <AiOutlineLeft size={25} color="#fff" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Previous;
