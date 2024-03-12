const express = require("express");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { default: helmet } = require("helmet");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

require("./dbs/mongodb.init");

app.use("/api/", require("./routes"));

//error handler
app.use((req, res, next) => {
  const newErr = new Error("not found");
  newErr.status = 404;
  next(newErr);
});
app.use((error, req, res) => {
  const statusCode = error.status || 500;
  const errMessage = error.message || "Internal Error";

  return res.status(statusCode).json({
    code: statusCode,
    message: errMessage,
    stack: error.stack,
    status: "error",
  });
});
module.exports = app;
