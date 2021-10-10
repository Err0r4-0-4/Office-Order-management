const { v4: uuidv4 } = require("uuid");
var admin = require("firebase-admin");
var firebase = require("../utils/firebase");
const db = admin.firestore();
const bucket = admin.storage().bucket();
// var storageRef = admin.storage().ref();
// const firebaseConfig = {
//   apiKey: "AIzaSyARusPln3h1viFDSlg_VjHv-v214rB_ztg",
//   authDomain: "test2-656d0.firebaseapp.com",
//   projectId: "test2-656d0",
//   storageBucket: "test2-656d0.appspot.com",
//   messagingSenderId: "434578848756",
//   appId: "1:434578848756:web:a1d7a694e4971614f817a1",
//   measurementId: "G-ECE7G17P7M",
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

exports.uploadOrder = async (req, res, next) => {
  try {
    let title = req.body.title;
    let addons = req.body.addons;
    let visibility = req.body.visibility;
    let type = req.body.type;
    let keywords = req.body.keywords;
    let file = req.files.file;
    console.log(file);
    //let id = uuidv4();
    // var mountainsRef = storageRef.child(id);
    // await mountainsRef.put(file);
    // console.log(visibility);
    // let DownloadURL = await storageRef.child(id).getDownloadURL();
    // console.log(DownloadURL);
    const blob = firebase.bucket.file(file.name);
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
    blobWriter.on("error", (err) => {
      console.log(err);
    });

    blobWriter.on("finish", async () => {
      //res.status(200).send("File uploaded.");
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;

      await db.collection("orders").add({
        title: title,
        imageUrl: publicUrl,
        addons: addons,
        visibility: visibility,
        type: type,
        keywords: keywords,
      });
      let keywordDoc = await db
        .collection("keywords")
        .doc("1sKJt3XpeYiOyQgFcFaj")
        .get();
      let allKeywords = keywordDoc.data().keywords;
      allKeywords = [...allKeywords, ...keywords];
      await db.collection("keywords").doc("1sKJt3XpeYiOyQgFcFaj").update({
        keywords: allKeywords,
      });

      res.status(200).send({ message: "upload successfull" });
    });

    blobWriter.end(file.data);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
