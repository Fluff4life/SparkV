const URL = require("url");
const Express = require("express");
const passport = require("passport");

const Router = Express.Router();

const CheckAuth = require("../../utils/CheckAuth");
const Render = require("../../utils/Render");

route.use("/approve", require("./admin/approve"));

module.exports = Router;
