const URL = require("url");
const Express = require("express");
const passport = require("passport");

const Router = Express.Router();

const CheckAuth = require("../../utils/CheckAuth");
const Render = require("../../utils/Render");

Router.get(
<<<<<<< HEAD
  "/",
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  async (request, response, next) => {
    if (request.session.backURL) {
      const url = request.session.backURL;

      request.session.backURL = null;
      response.redirect(url);
    } else {
      response.redirect("/");
    }
  },
=======
    "/",
    passport.authenticate("discord", {
        failureRedirect: "/",
    }),
    async (request, response, next) => {
        if (request.session.backURL) {
            const url = request.session.backURL;

            request.session.backURL = null;
            response.redirect(url);
        } else {
            response.redirect("/");
        }
    }
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
);

module.exports = Router;
