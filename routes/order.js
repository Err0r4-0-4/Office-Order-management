const { Router } = require("express");
const express = require("express");
const orderController = require("../controllers/order");

const route = express.Router();

route.post("/upload", orderController.uploadOrder);
route.post("/keywords", orderController.getKeywords);
route.post("/getLastMember", orderController.getLastMember);
route.post("/getParentOrder", orderController.getParentOrder);
route.post("/auth", orderController.auth);
module.exports = route;
