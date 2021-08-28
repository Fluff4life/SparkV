const Express = require("express");
const Router = Express.Router();

const CheckAuth = require("../utils/CheckAuth");
const Render = require("../utils/Render");

Router.get("/", async (request, response) =>
    Render(response, request, "company.ejs")
);
Router.get("/king", async (request, response) =>
    Render(response, request, "portfolio_king.ejs")
);
Router.get("/status", async (request, response) =>
    response.redirect("https://stats.uptimerobot.com/x84NBTJEkN")
);
Router.use("/api", require("./api/index"));

module.exports = Router;
