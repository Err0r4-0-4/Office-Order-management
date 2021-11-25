var admin = require("firebase-admin");

module.exports = async (req, res, next) => {
  const token = req.get("token");
  console.log(token);
  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(token);
    const organization = decodedToken.email.split("@")[1];
    console.log(organization);
    if (organization !== "iiitvadodara.ac.in") {
      const err = new Error("You are not Authorized to use this resource!");
      err.statusCode = 401;
      res.status(err.statusCode).send({ message: err.message });
    }
  } catch (err) {
    err.statusCode = 500;
    res.status(err.statusCode).send({ message: err.message });
  }

  next();
};
