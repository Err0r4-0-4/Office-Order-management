import React, { useEffect, useState, useRef } from "react";
import styles from "./Homepage.module.css";
import firebase from "firebase";
import Form from "../components/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import vedio from "../Images/vedio.mp4";
import { useSelector, useDispatch } from "react-redux";

const Homepage = () => {

  const role = useSelector((state) => state.member);

  const [orders, setOrders] = useState([]);

  let s = "Student";

  let config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  try {
    useEffect(() => {
      axios
        .get(
          `https://office-order-backend.herokuapp.com/office/getLatestOrder?role=${role}`,
          {},
          config
        )
        .then(async (res) => {
          console.log(res.data.result);

          let a = res.data.result.map((data) => (
            <div className={styles.recent}>
              <div className={styles.rec1}>
                <div className={styles.order}>IIITV/2019-20/ {data.serialNo}</div>
                <div className={styles.name}>{data.title}</div>
              </div>
              <div className={styles.rec2}>
                <div className={styles.date}>{data.date}</div>
                <div className={styles.button}>
                  <Link className={styles.previewo} to="/prevorder">
                    Preview
                  </Link>
                </div>
              </div>
            </div>
          ));
          setOrders(a);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  } catch (e) {
    console.log("Error");
  }

  return (
    <div className={styles.homepage}>
      <div className={styles.div1}>
        <div className={styles.per}>
          <div className={styles.back}></div>

          <img
            alt="profile picture"
            src={firebase.auth().currentUser.photoURL}
            className={styles.img}
          />
          <div className={styles.personal}>
            <p className={styles.nameroll}>
              {firebase
                .auth()
                .currentUser.displayName.substring(
                  0,
                  firebase.auth().currentUser.displayName.indexOf(" ")
                )}
            </p>
            <p className={styles.nameroll}>
              {firebase
                .auth()
                .currentUser.displayName.substring(
                  firebase.auth().currentUser.displayName.indexOf(" ") + 1,
                  firebase.auth().currentUser.displayName.length
                )
                .toLocaleLowerCase()}
            </p>
            <p className={styles.small}>
              {s} at Indian Institute of Information Technology Vadodara.
            </p>
            <p className={styles.small}>{firebase.auth().currentUser.email}</p>
            <p className={styles.small}>
              {firebase.auth().currentUser.email.substring(0, 4)} Batch
            </p>
          </div>
        </div>
        <div className={styles.link}>
          <p className={styles.links}>Links</p>
          <ul>
            <li>
              <a href="http://www.iiitvadodara.ac.in/">IIIT Vadodara Website</a>
            </li>
            <li>
              <a href="https://betamoodle.iiitvadodara.ac.in/">
                Moodle IIIT Vadodara
              </a>
            </li>
            <li>
              <a href="http://nptel.iiitv.ac.in/">NPTEL@ IIIT Vadodara</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.adddiv}>
        <div className={styles.addsec}>
          <div className={styles.header}>
            <h2>Recent Orders</h2>
            <Link className={styles.view} to="/prevorder">
              View All
            </Link>
          </div>
          {orders}
        </div>
      </div>

      <div className={styles.div3}>
        <div className={styles.link}>
          <p className={styles.links}>Links</p>
          <ul>
            <li>
              <a href="http://www.iiitvadodara.ac.in/">IIIT Vadodara Website</a>
            </li>
            <li>
              <a href="https://betamoodle.iiitvadodara.ac.in/">
                Moodle IIIT Vadodara
              </a>
            </li>
            <li>
              <a href="http://nptel.iiitv.ac.in/">NPTEL@ IIIT Vadodara</a>
            </li>
          </ul>
        </div>
        <div className={styles.link2}>
          <div className={styles.link}>
            <video controls className={styles.vedio}>
              <source src={vedio} type="video/mp4" />
              <source src={vedio} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
