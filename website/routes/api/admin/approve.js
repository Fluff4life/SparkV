const URL = require("url");
const Express = require("express");
const passport = require("passport");

const Router = Express.Router();

const Bots = require("../../../../database/schemas/bots");

const CheckAuth = require("../../utils/CheckAuth");
const Render = require("../../utils/Render");

route.post("/:id", CheckAuth, async (request, response) => {
<<<<<<< HEAD
  if (!request.user.staff) {
    return response.status(401).send({ success: false, message: "401 Forbidden" });
  }
=======
    if (!request.user.staff) {
        return response
            .status(401)
            .send({ success: false, message: "401 Forbidden" });
    }
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

  // To be continued.
});

module.exports = Router;
