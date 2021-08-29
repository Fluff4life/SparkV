const Discord = require("discord.js");
const Express = require("express");

const Router = Express.Router();

const CheckAuth = require("../../utils/CheckAuth");
const Render = require("../../utils/Render");

Router.get("/", CheckAuth, (request, response) => {
  request.session.destroy(() => {
    request.logout();
    response.redirect("/");
  });
});

module.exports = Router;
