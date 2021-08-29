const Express = require("express");

const Router = Express.Router();

const CheckAuth = require("../utils/CheckAuth");
const Render = require("../utils/Render");

Router.get("/", async (request, response) => {
    response.redirect("/404?reason=user_not_found");
});

Router.get("/:userID", async (request, response) => {
    if (!request.params.userID) {
        response.redirect("404?reason=user_not_found");
    }

    response.redirect(`/users/${request.params.userID}/profile`);
});

Router.get("/:userID/profile", async (request, response) => {
  if (!request.params.userID) {
    response.redirect("404?reason=invalid_args");
  }

  let User = await global.Database.get(`WebsiteData.Users.${request.params.userID}`);

  if (User) {
    Render(response, request, "profile.ejs", User);
    } else {
        response.redirect("404?reason=404_not_found");
    }
});

module.exports = Router;
