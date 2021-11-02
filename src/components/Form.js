import React, { useEffect, useState, useRef } from "react";
import firebase from "../util/firebase";
import UploadImage from "./UploadImage";
import { v4 as uuid } from "uuid";
import styles from "./Form.module.css";
import axios from "axios";
import Member from "../Cards/LastMember/LastMember";
import Spinner from "../UI/Spinner";

const db = firebase.firestore();
var storageRef = firebase.storage().ref();

export default function Form() {
  let a = [];
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState({});
  const [orderUploaded, setOrderUploaded] = useState(false);
  const [visibility, setVisibility] = useState([]);
  const [addons, setAddons] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [keywordList, setkeywordList] = useState("");
  const [addonError, setAddonError] = useState("");
  const [members, setMembers] = useState([]);
  const [familyName, setFamilyName] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoding] = useState(false);
  const [newFamily, setNewFamily] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {

    setLoding(true);

    console.log("fetch");

    axios
    .post("https://office-order-backend.herokuapp.com/office/keywords")
    .then( async (res) => {

      console.log(res.data.keywords);
      setkeywordList(res.data.keywords.map(k=><option>{k}</option>));

      console.log(keywords);

      setLoding(false);

    })
    .catch((err) => {
      console.log(err);
      setLoding(false);
    });

    setLoding(true);

    axios
    .post("https://office-order-backend.herokuapp.com/office/getLastMember")
    .then( async (res) => {

      console.log(res.data.keywords);
      setMembers(res.data.keywords);

      setLoding(false);

    })
    .catch((err) => {
      console.log(err);
      setLoding(false);
    });

  }, []);

  const setNew = (n) => {
    setFamilyName(n);
    setNewFamily(true);
    console.log(n);
  }

  const setFamilyHandler = (familyName, familyId) => {
    setFamilyName(familyName);

    setName(familyId);
    setNewFamily(false);

    console.log(familyName); 
  }

  let memberArray = (
    <div>
      {members.map((m) => (
        <Member
        name={m.lastOrder.familyName} id={m.lastOrder.familyId} setFamily={setFamilyHandler}/>
      ))}
    </div>
  );

  const uploadForm = async (e) => {
    console.log("DownloadURL");
    try {
      e.preventDefault();

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;

    console.log(today);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("visibility", visibility);
      formData.append("addons", addons);
      formData.append("type", type);
      formData.append("keywords", keywords);
      formData.append("file", file);
      formData.append("date", today);
      formData.append("newFamily", newFamily);

      console.log(name);
      console.log(familyName);

      // if(newFamily)
      formData.append("familyName", familyName);

      if(!newFamily)
      formData.append("familyId", name);

      console.log(formData);

      setLoding(true);

      axios
      .post("https://office-order-backend.herokuapp.com/office/upload", formData)
      .then( async (res) => {
  
        console.log(res);

        setLoding(false);
 
      })
      .catch((err) => {
        console.log(err);
        setLoding(false);
      });
      
      // console.log("Doc Id: ", orders.id);
      setOrderUploaded(true);
      setTitle("");
      setFile({});
      setKeywords([]);
      console.log("order added to ORDER collection");
    } catch (error) {
      console.log(error);
    }
  };

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      //console.log(a)
      setVisibility([...visibility, e.target.value]);
      a.push(e.target.value);
    } else {
      console.log(visibility);
      let d = [...visibility];
      let index = d.indexOf(e.target.value);
      d.splice(index, 1);
      setVisibility([...d]);
      //a.pop(e.target.value);
    }
    console.log(visibility);
  };

  const radioHandler = (e) => {
    setType(e.target.value);
  };

  const removeAddon = (e) => {
    console.log(e.target.id);
    let p = keywords;
    let index = p.indexOf(e.target.id);
    p.splice(index, 1);
    setAddonError("");
    setKeywords([...p]);
  };

  let options = keywords.map((addon) => (
    <li className={styles.addons} className={styles.tagsselli}>
      {addon}
      <span id={addon} className={styles.cross} onClick={removeAddon}>
        x
      </span>
    </li>
  ));

  let addonHandler = (e) => {
    console.log(e.target.value);
    let p = addons;
    if (addons.includes(e.target.value)) {
      console.log("addonError");
      setAddonError("**This option is already Added!");
      return;
    }
    setAddonError("");
    setAddons([...p, e.target.value]);
    var dropDown = document.getElementById("dropdown");
    dropDown.selectedIndex = 0;
  };

  let keywordsHandler = () => {
    let input = document.getElementById("keywordsInput");
    let newKeywords = [...keywords, input.value];
    setKeywords(newKeywords);
    input.value = "";
    console.log(newKeywords);
  };

  const addKeyWords = (event) => {
    console.log(keywords);
    let t = keywords;
    setKeywords([...t, event.target.value]);
    console.log(keywords);
  }
  
  return (
    <div>
      {loading ? <Spinner/> : null}
      <form onSubmit={uploadForm} className={styles.form}>
        <h1 className={styles.h1}>Upload a order</h1>
        <div className={styles.one}>
          <h1 className={styles.h2}>Order number</h1>
          <div className={styles.name}>
            <div className={styles.iiit}>IIITV/21-22/</div>
            <input
              type="text"
              placeholder="Next Order"
              onChange={(e) => setTitle(e.target.value)}
              //value={title}
              className={styles.namei}
            />
          </div>
          <br />
        </div>

        <div className={styles.one}>
          <h1 className={styles.h2}>Upload image</h1>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className={styles.drag}
            placeholder="Drop files here"
          />
          <br />
        </div>
        <div className={styles.one}>
          <h3 className={styles.h2}>Internal/External</h3>

          <span>
            <input
              type="radio"
              id="internal"
              name="ie"
              value="internal"
              onChange={radioHandler}
            />
             <label for="internal">Internal</label>
          </span>
          <span>
             {" "}
            <input
              type="radio"
              id="external"
              name="ie"
              value="external"
              onChange={radioHandler}
            />
            <label for="external">External</label>
          </span>
          <br></br>
        </div>
        <div className={styles.one}>
          <h3 className={styles.h2}>Visibility</h3>

          <span>
            <input
              type="checkbox"
              id="registrar"
              name="registrar"
              value="registrar"
              onChange={checkboxHandler}
            />
            <label for="registrar"> Registrar</label>
          </span>
          <span>
            <input
              type="checkbox"
              id="faculty"
              name="faculty"
              value="faculty"
              onChange={checkboxHandler}
            />
            <label for="faculty"> Faculty</label>
          </span>
          <span>
            <input
              type="checkbox"
              id="staff"
              name="staff"
              value="staff"
              onChange={checkboxHandler}
            />
            <label for="staff"> Staff</label>
          </span>
          <span>
            <input
              type="checkbox"
              id="student"
              name="student"
              value="student"
              onChange={checkboxHandler}
            />
            <label for="student"> Student</label>
          </span>
          <br></br>
        </div>

        
        
        <div className={styles.one}>
          <h2 className={styles.h2}>Add keywords</h2>
          <input
            type="text"
            id="keywordsInput"
            placeholder="Add Keywords"
            className={styles.hundred}
          />
          
          {" "}

          <select className={styles.sel} onChange = {addKeyWords}>
            <option selected value>
              All
            </option>
            {keywordList}
          </select>

          <div className={styles.tagsel}>
            {options}
            <p className={styles.err}>{addonError}</p>
          </div>

          <div onClick={keywordsHandler} className={styles.btn}>
            ADD
          </div>
        </div>

        {memberArray} 

        <input placeholder="new family" 
         onChange={(e) => setNew(e.target.value)}/>

        <button className={styles.button}>Upload Order </button>
      </form>
      {orderUploaded ? (
        <p style={{ color: "green", fontWeight: "bold" }}>
          Order Uploaded Successfully!
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
