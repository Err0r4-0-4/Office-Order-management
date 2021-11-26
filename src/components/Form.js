import React, { useEffect, useState, useRef } from "react";
import firebase from "../util/firebase";
import UploadImage from "./UploadImage";
import { v4 as uuid } from "uuid";
import styles from "./Form.module.css";
import axios from "axios";
import Member from "../Cards/LastMember/LastMember";
import Spinner from "../UI/Spinner";
import Modal from "../UI/Modal";
import { AiOutlineClose } from "react-icons/ai";

const db = firebase.firestore();
var storageRef = firebase.storage().ref();

let config = {
  headers: {
    token: localStorage.getItem("token")
  }
}

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
  // const [memberArray, setmemberArray] = useState("");

  const [name, setName] = useState("");
  const [loading, setLoding] = useState(false);
  const [newFamily, setNewFamily] = useState(false);
  const [date, setDate] = useState("");
  const [family, setfamily] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  const hideHandler = () => {
    setShowModal(false)
  }

  useEffect(() => {
    setLoding(true);

    axios
      .post("https://office-order-backend.herokuapp.com/office/keywords",
      {},
      config)
      .then(async (res) => {
        setkeywordList(res.data.keywords);

        setLoding(false);
      })
      .catch((err) => {
        setLoding(false);
      });

    setLoding(true);

    axios
      .post("https://office-order-backend.herokuapp.com/office/getLastMember",
      {},
      config)
      .then(async (res) => {
        console.log(res.data.keywords);
        setMembers(res.data.keywords);

        setLoding(false);
      })
      .catch((err) => {
        setLoding(false);
      });
  }, []);

  const setNew = (n) => {
    setFamilyName(n);
    setNewFamily(true);
  };

  const setFamilyHandler = (familyName, familyId) => {
    setFamilyName(familyName);

    setName(familyId);
    setNewFamily(false);
  };

  console.log(members);

  let memberArray = (
    <div>
      {members.map((m) => (
        <Member
          name={m.lastOrder.familyName}
          id={m.lastOrder.familyId}
          setFamily={setFamilyHandler}
        />
      ))}
    </div>
  );

  const uploadForm = async (e) => {
    try {
      e.preventDefault();

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("visibility", visibility);
      formData.append("addons", addons);
      formData.append("type", type);
      formData.append("keywords", keywords);
      formData.append("file", file);
      formData.append("date", today);
      formData.append("newFamily", newFamily);

      // if(newFamily)
      formData.append("familyName", familyName);

      if (!newFamily) formData.append("familyId", name);

      setLoding(true);

      axios
        .post(
          "https://office-order-backend.herokuapp.com/office/upload",
          formData,
          config
        )
        .then(async (res) => {
          console.log(res);
          
          setLoding(false);
          setShowModal(true)
        })
        .catch((err) => {
          setLoding(false);
          // window.alert("Error in uploading Office Order");
          setError(true);
          setShowModal(true);
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
      setVisibility([...visibility, e.target.value]);
      a.push(e.target.value);
    } else {
      let d = [...visibility];
      let index = d.indexOf(e.target.value);
      d.splice(index, 1);
      setVisibility([...d]);
      //a.pop(e.target.value);
    }
  };

  const radioHandler = (e) => {
    setType(e.target.value);
  };

  const removeAddon = (e) => {
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
        <AiOutlineClose />
      </span>
    </li>
  ));

  let addonHandler = (e) => {
    let p = addons;
    if (addons.includes(e.target.value)) {
      setAddonError("**This option is already Added!");
      return;
    }
    setAddonError("");
    setAddons([...p, e.target.value]);
    var dropDown = document.getElementById("dropdown");
    dropDown.selectedIndex = 0;
  };

  let keywordsHandler = (e) => {
    e.preventDefault();
    let input = document.getElementById("keywordsInput");
    let newKeywords = [...keywords, input.value];
    setKeywords(newKeywords);
    input.value = "";
  };

  const addKeyWords = (event) => {
    let t = keywords;
    setKeywords([...t, event.target.value]);
  };

  return (
    <div>
      <Modal show={showModal} switch={hideHandler}>
        {error ? "Error in uploading" : "Successfully uploaded"}
      </Modal>
      {loading ? <Spinner /> : null}
      <form onSubmit={uploadForm} className={styles.form}>
        <h1 className={styles.h1}>Upload New Order</h1>

        <div className={styles.line}></div>
        <div className={styles.one}>
          <h1 className={styles.h2}>Order Number</h1>
          <div className={styles.name}>
            <div className={styles.iiit}>IIITV/2019-20/12</div>
            <input
              type="text"
              placeholder="Regarding Issue"
              onChange={(e) => setTitle(e.target.value)}
              //value={title}
              className={styles.namei}
            />
          </div>
          <br />
        </div>

        <div className={styles.line}></div>

        <div className={styles.one}>
          <h1 className={styles.h2}>Internal/External</h1>

          <span>
            <input
              type="radio"
              id="internal"
              name="ie"
              value="internal"
              onChange={radioHandler}
              className={styles.radio}
            />
             <label for="internal">Internal</label>
          </span>
          <span>
            <input
              type="radio"
              id="external"
              name="ie"
              value="external"
              className={styles.radio}
              onChange={radioHandler}
            />
            <label for="external">External</label>
          </span>
          <br></br>
        </div>

        <div className={styles.line}></div>

        <div className={styles.one}>
          <h1 className={styles.h2}>Visibility</h1>

          <span>
            <input
              type="checkbox"
              id="registrar"
              name="registrar"
              value="registrar"
              className={styles.radio}
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
              className={styles.radio}
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
              className={styles.radio}
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
              className={styles.radio}
              onChange={checkboxHandler}
            />
            <label for="student"> Student</label>
          </span>
          <br></br>
        </div>
        <div className={styles.line}></div>

        <div className={styles.one}>
          <h2 className={styles.h2}>Add keywords</h2>
          <div className={styles.hundred1}>
            <input
              type="text"
              id="keywordsInput"
              placeholder="Add Keywords"
              className={styles.namei}
            />

            <button onClick={keywordsHandler} className={styles.btn}>
              Manually Add
            </button>
          </div>

          <select className={styles.sel} onChange={addKeyWords}>
            <option selected value>
              --Select Keywords--
            </option>
            {keywordList}
          </select>
          <div className={styles.tagsel}>
            {options ? options : <p>Keywords will be added</p>}
            <p className={styles.err}>{addonError}</p>
          </div>
        </div>
        <div className={styles.line}></div>

        <div className={styles.one}>
          <h1 className={styles.h2}>Family</h1>
          {/* <select className={styles.sel} onChange={addKeyWords}>
            <option selected value>
              --Family --
            </option>
          </select> */}
          {memberArray}
          <input
            placeholder="Add a New Family"
            onChange={(e) => setNew(e.target.value)}
            className={styles.inp}
          />
        </div>
        <div className={styles.line}></div>

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
        <div className={styles.line}></div>
        <button className={styles.button}>Upload Order </button>
      </form>
      
    </div>
  );
}
