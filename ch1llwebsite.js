// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log(require("chalk").green("LOADING STARTED - WEBSITE => Now loading website."))

// Librarys //
const express = require("express");
const favicon = require("serve-favicon")
const path = require("path")
const Chalk = require("chalk")
const session = require("express-session");
const passport = require("passport")
const { Strategy } = require("passport-discord")
const Config = require("./globalconfig.json");

// App //
const app = express();

// Code //
console.log("-------- Loading Website --------");
if (Config.SystemsEnabled.Down === true) {
  app
    .use((req, res, next) => {
      res
        .status(500)
        .render("down")
    });
} else {
  app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

    .engine("html", require("ejs").renderFile)
    .set("view engine", "ejs")

    .use(favicon(__dirname + "/public/assets/images/favicon.ico"))

    .use(express.static(path.join(__dirname + "/public")))
    .set("views", __dirname + "/views")

    .use(session({
      secret: `Ch1llSecretID`,
      resave: false,
      saveUninitialized: false
    }))

    .use(async (request, response, next) => {
      request.user = request.session.user
      request.Bot = Bot
      request.states = []

      next()
    })

    .set("port", process.env.port)

    .use("/", require("./public/routes/main"))
    .use("/home", require("./public/routes/home"))
    .use("/api", require("./public/routes/api"))
    // .use("/user", require("./public/auth/CheckAuth"), require("./public/routes/user"))

    .use("/bot", require("./public/routes/bot"))

    .use((request, response, next) => {
      response
        .status(404)
        .render("404", {
          user: request.user,
          currentURL: `${request.protocol}://${request.get("host")}${request.originalUrl}`
        })
    })
    .use((err, request, response) => {
      console.error(err.stack)

      response
        .status(500)
        .render("500", {
          user: request.userinfo,
          currentURL: `${request.protocol}://${request.get("host")}${request.originalUrl}`
        })
    })

    // Listener //
    const listener = app.listen(process.env.PORT, Config.Debug == true ? "localhost" : null, () => {
        console.log(Chalk.blue(`SUCCESS - WEBSITE => ${Config.Debug == true ? `Server running at http://localhost:${listener.address().port}` :  `Server running on port ${listener.address().port}`}`))
    })
}