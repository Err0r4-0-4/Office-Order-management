const { Router } = require("express");
const express = require("express");
const orderController = require("../controllers/order");
const isRegistrar = require("../middlewares/is-registrar");

const route = express.Router();

route.post("/upload", isRegistrar, orderController.uploadOrder);
route.post("/keywords", orderController.getKeywords);
route.post("/getLastMember", orderController.getLastMember);
route.post("/getParentOrder", orderController.getParentOrder);
route.post("/getOtherOrder", orderController.getOtherOrder);
route.post("/isRegistrar", orderController.isRegistrar);
module.exports = route;
