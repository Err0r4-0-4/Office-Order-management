import React, { useEffect, useState, useRef } from "react";
import styles from "./Homepage.module.css";
import firebase from "firebase";
import Form from "../components/Form";
import { Link } from "react-router-dom";
import axios from "axios";


const Homepage = () => {

  // const [orders, setOrders] = useState([]);

  let s = "Student";

  let config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  let orders = []

  try {
    useEffect(() => {
      
      axios
        .get(
          "https://office-order-backend.herokuapp.com/office/getLatestOrder",
          {},
          config
        )
        .then(async (res) => {
          console.log(res.data.result);
          setOrders(res.data.result);
         
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
          <div className={styles.recent}>
            <div className={styles.rec1}>
              <div className={styles.order}>IIITV/2019-20/12</div>
              <div className={styles.name}>{orders.}</div>
            </div>
            <div className={styles.rec2}>
              <div className={styles.date}>22 Jan 2019</div>
              <div className={styles.button}>
                <Link className={styles.previewo} to="/prevorder">
                  Preview
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.recent}>
            <div className={styles.rec1}>
              <div className={styles.order}>IIITV/2019-20/14</div>
              <div className={styles.name}>Order 2</div>
            </div>
            <div className={styles.rec2}>
              <div className={styles.date}>22 Jan 2019</div>
              <div className={styles.button}>
                <Link className={styles.previewo} to="/prevorder">
                  Preview
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.recent}>
            <div className={styles.rec1}>
              <div className={styles.order}>IIITV/2019-20/15</div>
              <div className={styles.name}>Order 3</div>
            </div>
            <div className={styles.rec2}>
              <div className={styles.date}>14 Jan 2019</div>
              <div className={styles.button}>
                <Link className={styles.previewo} to="/prevorder">
                  Preview
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.recent}>
            <div className={styles.rec1}>
              <div className={styles.order}>IIITV/2019-20/16</div>
              <div className={styles.name}>Order 4</div>
            </div>
            <div className={styles.rec2}>
              <div className={styles.date}>11 Jan 2019</div>
              <div className={styles.button}>
                <Link className={styles.previewo} to="/prevorder">
                  Preview
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.recent}>
            <div className={styles.rec1}>
              <div className={styles.order}>IIITV/2019-20/17</div>
              <div className={styles.name}>Order 5</div>
            </div>
            <div className={styles.rec2}>
              <div className={styles.date}>05 Jan 2019</div>
              <div className={styles.button}>
                <Link className={styles.previewo} to="/prevorder">
                  Preview
                </Link>
              </div>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default Homepage;
