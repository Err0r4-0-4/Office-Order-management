import React, { useEffect, useState, useRef } from "react";
import Showimage from "../components/Showimage";
import styles from "./Previous.module.css";
import firebase from "../util/firebase";
import img from "../Images/pdf.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Authactions } from "../store/Auth-login";

import {
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Spinner from "../UI/Spinner";

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
  const [ordersD, setordersD] = useState([]);
  const [previewURL, setPreviewURL] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [familyId, setFamilyId] = useState([]);
  const [count, setCount] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderCount, setOrdersCount] = useState([]);

  const role = useSelector((state) => state.member);
  const tkn = useSelector((state) => state.token);

  let config = {
    headers: {
      token: tkn,
    },
  };

  useEffect(() => {

    setLoading(true);

    axios
      .post(
        "https://office-order-backend.herokuapp.com/office/keywords",
        {},
        config
      )
      .then(async (res) => {
        console.log(res.data.keywords);
        setKeywords(res.data.keywords.map((k) => <option>{k}</option>));

        console.log(keywords);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const getParentHandler = (doc) => {
    console.log(doc);

    setFamilyId(doc.familyId);
    setCount(doc.count);
    setImage(doc.imageUrl);

    const data = {
      familyId: doc.familyId,
    };

    setLoading(true);

    axios
      .post(
        "https://office-order-backend.herokuapp.com/office/getParentOrder",
        data,
        config
      )
      .then(async (res) => {
        console.log(res);

        preViewHandler(res.data.data.imageUrl);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const navigateHandler = (e) => {
    let c = +count + 1;

    if (e === "prev") {
      c = +c - 2;
    }

    console.log(c);

    const data = {
      familyId: familyId,
      count: c,
    };

    console.log(data);

    setLoading(true);

    axios
      .post(
        "https://office-order-backend.herokuapp.com/office/getOtherOrder",
        data,
        config
      )
      .then(async (res) => {
        console.log(res);

        // setImage(res.data.data.imageUrl);

        preViewHandler(res.data.data.imageUrl);
        setCount(c);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const keywordSearch = (e) => {
    console.log(e.target.value);

    console.log(typeof e.target.value);
    let renderSearchData = [];
    if (e.target.value === "true") {
      renderSearchData = ordersD;
    } else {
      renderSearchData = ordersD.filter((od) =>
        od.lastOrder.keywords.includes(e.target.value)
      );
    }

    console.log("renderSearchData", renderSearchData[0]);
    setshoworders(
      renderSearchData.map((doc) => (

        doc.lastOrder.visibility.split(",").includes(role) ?

        <div className={styles.box}>
          <img src={img} className={styles.img}></img>
          <div className={styles.inner}>
            <h4 className={styles.date}>{doc.lastOrder.date}</h4>
            <h5>{doc.serialNo}</h5>
            <h2 className={styles.title}>{doc.lastOrder.title}</h2>
            <button
              onClick={() =>
                preViewHandler(doc.lastOrder.imageUrl, doc.lastOrder.familyId, doc.lastOrder.count)
              }
              target="_top"
              className={styles.link}
            >
              Preview Orde
            </button>
          </div>
        </div>
        :
        null
      ))
    );
  };

  const preViewHandler = (e, i, c) => {
    console.log(c);
    setCount(c);
    setFamilyId(i);
    setImage(e);
    console.log(e);
    setPreviewURL(e);
    setopen(true);
  };

  useEffect(() => {
    async function getData(params) {
      console.log("in Use Effect!");
      let docData = await db.collection("orders").get();

      let a = await axios.post(
        "https://office-order-backend.herokuapp.com/office/getLastMember",
        {},
        config
      );

      console.log(a);

      setOrdersCount(a.data.keywords.length);

      let data = a.data.keywords;
      console.log(data);
      // docData.forEach((d) => data.push(d.data()));
      //data.map((doc) => doc.data());
      let docDataRender = data.map((doc) => (

        doc.lastOrder.visibility.split(",").includes(role) ?

        <div className={styles.box}>
          <img src={img} className={styles.img}></img>
          <div className={styles.inner}>
            <h4 className={styles.date}>{doc.lastOrder.date}</h4>

            {/* <h5>OO:IIITV/2019-20/I/12</h5> */}
            <h5>{doc.lastOrder.serialNo}</h5>

            <h2 className={styles.title}>{doc.lastOrder.title}</h2>
            <button
              onClick={() =>
                preViewHandler(
                  doc.lastOrder.imageUrl,
                  doc.lastOrder.familyId,
                  doc.lastOrder.count
                )
              }
              target="_top"
              className={styles.link}
            >
              Preview Order
            </button>
            {console.log(doc.lastOrder.familyId, doc.lastOrder.count)}
            {/* <button
              target="_top"
              className={styles.link}
              onClick={() => getParentHandler(doc.lastOrder)}
            >
              Parent Order
            </button> */}
            {/* <span className={styles.addons}>{doc.addons}</span> */}
          </div>
        </div>

        : null
      ));

      setOrders(docDataRender);
      setordersD(data);
    }
    getData();
  }, []);
  return (
    <div className={styles.page}>
      {loading ? <Spinner /> : null}
      <div className={styles.search}>
        <div className={styles.select}>
          <select onChange={keywordSearch} className={styles.sel}>
            <option selected value>
              All
            </option>
            {keywords}
          </select>
          <p>
            <span className={styles.big}>{orderCount}</span> orders created
          </p>
        </div>
      </div>
      <div className={styles.search2}>
        <h1 className={open ? styles.h2 : styles.h1}>Previous Orders</h1>
        <div className={open ? styles.flex2 : styles.flex}>
          {/* <Showimage /> */}
          {showorders ? showorders : orders}
        </div>
      </div>
      <div className={open ? styles.previewMain : styles.hid}>
        <div className={styles.close}>
          <iframe
            className={styles.preview}
            src={image}
            title="test"
            style={{ border: "1px solid black" }}
          />

          <div
            className={open ? styles.closebut : styles.closebut2}
            onClick={f2}
          >
            {open ? (
              <AiOutlineClose size={25} color="#fff" className={styles.icon} />
            ) : (
              <AiOutlineLeft size={25} color="#fff" className={styles.icon} />
            )}
          </div>

          <div className={styles.arrow}>
            <button
              onClick={() => navigateHandler("prev")}
              className={styles.arr}
              title="Previous Family Member"
            >
              <AiOutlineArrowLeft size={20} />
            </button>
            <button
              onClick={() => navigateHandler("next")}
              className={styles.arr}
              title="Next Family Member"
            >
              <AiOutlineArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Previous;
