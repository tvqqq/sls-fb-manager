require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const app = express();

// api json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mongoose connect
const mongoose = require("./config/mongoose");
mongoose.connect();

// cors
const cors = require("cors");
app.use(cors());

// lodash
const _ = require("lodash");
global._ = _;

// routes
const routes = require("./routes");
app.use("/api", routes);

const slsHandler = serverless(app);

// cronjob
const slsCronHandler = async (event, context) => {
  event.path = "/api/fb/friends/fetch";
  const result = await handler(event, context);
  return result;
};

module.exports = {
  serverless: slsHandler,
  cron: slsCronHandler,
  default: app,
};
