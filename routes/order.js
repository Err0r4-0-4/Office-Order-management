const { Router } = require("express");
const express = require("express");
const orderController = require("../controllers/order");
const isRegistrar = require("../middlewares/is-registrar");
const isAuth = require("../middlewares/isAuth");

const route = express.Router();

route.post("/upload", isRegistrar, isAuth, orderController.uploadOrder);
route.post("/keywords", isAuth, orderController.getKeywords);
route.post("/getLastMember", isAuth, orderController.getLastMember);
route.post("/getParentOrder", isAuth, orderController.getParentOrder);
route.post("/getOtherOrder", isAuth, orderController.getOtherOrder);
route.post("/isRegistrar", orderController.isRegistrar);
route.get("/getLatestOrder", orderController.getLatestOrder);
route.post("/isAuth", isAuth);
module.exports = route;
