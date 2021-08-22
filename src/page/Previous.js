import React, { useEffect, useState } from "react";
import Showimage from "../components/Showimage";

import firebase from "../util/firebase";
let db = firebase.firestore();

const Previous = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function getData(params) {
      console.log("in Use Effect!");
      let docSnap = await (
        await db.collection("orders").get()
      ).docs.map((doc) => (
        <div>
          <h2>{doc.data().title}</h2>
          <img src={doc.data().imageUrl}></img>
        </div>
      ));
      console.log(docSnap);
      setOrders(docSnap);
    }
    getData();
  }, []);

  return (
    <div style={{ margin: "70px" }}>
      <h1>Previous Orders</h1>
      {/* <Showimage /> */}
      {orders}
    </div>
  );
};

export default Previous;
