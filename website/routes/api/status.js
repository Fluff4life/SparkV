const Express = require("express");

const Router = Express.Router();

const CheckAuth = require("../../utils/CheckAuth");
const Render = require("../../utils/Render");

Router.get("/", async (request, response) =>
    response.status(200).send({ status: 200, message: "OK" })
);

module.exports = Router;
