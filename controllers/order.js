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
    console.log(req.body);
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

      let keywordDoc = await db
        .collection("keywords")
        .doc("1sKJt3XpeYiOyQgFcFaj")
        .get();
      let allKeywords = keywordDoc.data().keywords;
      allKeywords = [...allKeywords, ...keywords];
      await db.collection("keywords").doc("1sKJt3XpeYiOyQgFcFaj").update({
        keywords: allKeywords,
      });
      if (res.body.newFamily) {
        let newOrder = await db
          .collection("Families")
          .add({ lastOrder: order });
        await db
          .collection("Families")
          .doc(newOrder.id)
          .collection("members")
          .doc(orderDoc.id)
          .set(order);

        let order = {
          title: title,
          imageUrl: publicUrl,
          addons: addons,
          visibility: visibility,
          type: type,
          keywords: keywords,
          familyId: newOrder.id,
        };
        let orderDoc = await db.collection("orders").add(order);
      } else {
        await db
          .collection("Families")
          .doc(req.body.familyId)
          .collection("members")
          .doc(orderDoc.id)
          .set(order);
        await db
          .collection("Families")
          .doc(req.body.familyId)
          .update({ lastOrder: order });
        let order = {
          title: title,
          imageUrl: publicUrl,
          addons: addons,
          visibility: visibility,
          type: type,
          keywords: keywords,
          familyId: req.body.familyId,
        };
        let orderDoc = await db.collection("orders").add(order);
      }
      res.status(200).send({ message: "upload successfull" });
    });

    blobWriter.end(file.data);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

exports.getKeywords = async (req, res, next) => {
  try {
    let keywords = await db.collection("keywords").get();
    let data = [];
    keywords.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).send({ keywords: data[0].keywords });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

exports.getLastMember = async (req, res, next) => {
  try {
    let members = await db.collection("Families").get();
    let results = [];
    members.forEach((doc) => {
      results.push(doc.data());
    });
    res.status(200).send({ keywords: results });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

exports.getParentOrder = (req, res, next) => {
  try {
    let members = await db
      .collection("Families")
      .doc(req.body.familyId)
      .collection("members")
      .get();
    let temp = [];
    members.forEach((doc) => {
      temp.push(doc.data());
    });
    let result;
    if (temp.length === 1) {
      result = temp[0];
    } else {
      result = temp[temp.length - 2];
    }
    res.status(200).send({ data: res });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

exports.auth = (req, res, next) => {
  admin
    .auth()
    .verifyIdToken(req.body.idToken)
    .then((decodedToken) => {
      console.log(decodedToken);
      const uid = decodedToken.uid;
      // ...
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });
};