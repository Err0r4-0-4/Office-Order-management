import React, { useEffect, useState, useRef } from "react";
import firebase from "../util/firebase";
import UploadImage from "./UploadImage";
import { v4 as uuid } from "uuid";
import styles from "./Form.module.css";
import axios from "axios";
import Member from "../Cards/LastMember/LastMember";

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

  useEffect(() => {

    console.log("fetch");

    axios
    .post("https://office-order-backend.herokuapp.com/office/keywords")
    .then( async (res) => {

      console.log(res.data.keywords);
      setkeywordList(res.data.keywords.map(k=><option>{k}</option>));

      console.log(keywords);

    })
    .catch((err) => {
      console.log(err);
    });


    axios
    .post("https://office-order-backend.herokuapp.com/office/getLastMember")
    .then( async (res) => {

      console.log(res.data.keywords);
      setMembers(res.data.keywords);

    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  const setFamilyHandler = (familyId) => {
    setFamilyName(familyId);
    console.log(familyId); 
  }

  let memberArray = (
    <div>
      {members.map((m) => (
        <Member
        id={m.lastOrder.familyId} setFamily={setFamilyHandler}/>
      ))}
    </div>
  );

  const uploadForm = async (e) => {
    console.log("DownloadURL");
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("visibility", visibility);
      formData.append("addons", addons);
      formData.append("type", type);
      formData.append("keywords", keywords);
      formData.append("file", file);
      formData.append("newFamily", false);
      formData.append("familyId", familyName)

      console.log(formData);

      axios
      .post("https://office-order-backend.herokuapp.com/office/upload", formData)
      .then( async (res) => {
  
        console.log(res);
 
      })
      .catch((err) => {
        console.log(err);
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
    let p = addons;
    let index = p.indexOf(e.target.id);
    p.splice(index, 1);
    setAddonError("");
    setAddons([...p]);
  };
  let options = addons.map((addon) => (
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
    keywords.push(event.target.value);
    console.log(keywords);
  }
  
  return (
    <div>
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
        {/* <input
          type="text"
          placeholder="Addons"
          onChange={handleOnChange}
          value={title}
        /> */}
        <div className={styles.one}>
          <h2 className={styles.h2}>Tags along</h2>
          <select
            name="addons"
            id="dropdown"
            onChange={addonHandler}
            className={styles.hundred}
          >
            <option disabled selected value>
              {" "}
              -- select --{" "}
            </option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="Mandatory">Mandatory</option>
            <option value="Hidden">Hidden</option>
            <option value="Student">Student</option>
            <option value="Student2">Student2</option>
            <option value="Student3">Student3</option>
            <option value="Student4">Student4</option>
          </select>
        </div>
        <div className={styles.tagsel}>
          {options}
          <p className={styles.err}>{addonError}</p>
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

          <div onClick={keywordsHandler} className={styles.btn}>
            ADD
          </div>
        </div>

        {memberArray}
        

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
