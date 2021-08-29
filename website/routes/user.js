const Express = require("express");

const Router = Express.Router();

const CheckAuth = require("../utils/CheckAuth");
const Render = require("../utils/Render");

Router.get("/:id", async (request, response) => {
    let user = await request.app.get("client").users.fetch(request.params.id).catch("404?reason=user_not_found");

    if (!user) {
        return;
    }

    if (!request.params.id) {
        response.redirect("404?reason=user_not_found");
    }

    if (!user) {
        return response.redirect("404?reason=404_not_found");
    } else {
        Render(response, request, "profile.ejs", user);
    }
});

module.exports = Router;
