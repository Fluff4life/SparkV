// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log(require("chalk").green("LOADING STARTED - WEBSITE => Now loading website."))

// Librarys //
const express = require("express");
const favicon = require("serve-favicon")
const path = require("path")
const Chalk = require("chalk")
const session = require("cookie-session");
const Config = require("./globalconfig.json");

// App //
const app = express();

// Functions //
async function RunWebsite(Bot) {
  if (Config.SystemsEnabled.Down === true) {
    app.use((req, res, next) => {
      res.status(500);
      res.sendFile(__dirname + `/public/html/down.html`);
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

      .use(session({ secret: process.env.expresspassword, resave: false, saveUninitialized: false }))
      
      .use(async (request, response, next) => {
        request.user = request.session.user
        request.Bot = Bot
        request.states = []
        
        next()
      })

      .use("/", require("./public/routes/main"))
      .use("/home", require("./public/routes/home"))
      .use("/api", require("./public/routes/api"))
      .use("/logout", require("./public/routes/logout"))


      .use("/ch1llstudios", require("./public/routes/ch1llstudios"))
      .use("/ch1llblox", require("./public/routes/ch1llblox"))

    // .use("/manage", manage)
    // .use("/stats", stats)
    // .use("/settings", settings)

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
  }
}

// Code //
console.log("-------- Loading Website --------");
RunWebsite();

// Listener //
if (Config.Debug === true) {
  const listener = app.listen(process.env.PORT, "localhost", () => {
    console.log(Chalk.blue(`SUCCESS - WEBSITE => Server running at http://localhost:${listener.address().port} & listening on port ${listener.address().port}.`));
  })
} else {
  const listener = app.listen(process.env.PORT, () => {
    console.log(Chalk.blue(`SUCCESS - WEBSITE => Server listening on port ${listener.address().port}.`));
  })
}