var admin = require("firebase-admin");

var serviceAccount = require("../config/config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "test2-656d0.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};
