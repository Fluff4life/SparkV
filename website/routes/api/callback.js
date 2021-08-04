const URL = require("url");
const Express = require("express");
const passport = require("passport");

const Router = Express.Router();

const CheckAuth = require("../../utils/CheckAuth");
const Render = require("../../utils/Render");

Router.get("/", passport.authenticate("discord", {
    failureRedirect: "/"
}), async (request, response, next) => {
  if (request.session.backURL) {
    const url = request.session.backURL;

    request.session.backURL = null;
    response.redirect(url);
  } else {
    response.redirect("/");
  }
});

module.exports = Router;
