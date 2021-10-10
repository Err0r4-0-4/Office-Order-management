const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileuploader = require("express-fileupload");
require("./utils/firebase");
const app = express();

dotenv.config();
app.use(fileuploader());
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
const PORT = process.env.PORT || 9000;

app.use("/office", require("./routes/order"));

app.listen(PORT);
