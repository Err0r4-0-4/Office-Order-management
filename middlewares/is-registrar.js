var admin = require("firebase-admin");

module.exports = async (req, res, next) => {
  const token = req.get("token");
  console.log(token);
  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(token);
    const userEmail = decodedToken.email;
    if (userEmail !== "registrar@iiitvadodara.ac.in") {
      const err = new Error("You are not Authorized!");
      err.statusCode = 401;
      res.status(err.statusCode).send({ message: err.message });
    }
  } catch (err) {
    err.statusCode = 500;
    res.status(err.statusCode).send({ message: err.message });
  }

  next();
};
