// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log(require("chalk").green("LOADING STARTED - WEBSITE => Now loading website."))

// Librarys //
const express = require("express");
const session = require("express-session");
const path = require("path")
const Chalk = require("chalk")
const Config = require("./globalconfig.json")

// App //
const app = express();

// Error Handlers //
process.on("uncaughtException", (err, promise) => {
  const ErrorMessage = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")

  console.log(require("chalk").red(`ERROR => Uncaught Exception error. ${ErrorMessage}.`))
  process.exit(1)
})

process.on("unhandledRejection", (err, promise) => {
  console.log(require("chalk").red(`ERROR => Unhandled rejection error. ${err}.`))
})

process.on("multipleResolves", (type, promise, reason) => {
  console.log(require("chalk").red(`ERROR => Multiple resolves detected. ${type} - ${promise} - ${reason}.`))

  setImmediate(() => process.exit(1))
})

process.on("warning", (warning) => {
  console.log(require("chalk").yellow(`WARNING - ${warning.name} => ${warning.message}.`))
})

process.on("exit", (code) => {
  console.log(require("chalk").red(`EXITED - Process exited with code ${code}.`))
})

// Functions //
async function RunWebsite() {
  if (Config.SystemsEnabled.Down === true){
    app.use((req, res, next) => {
      res.status(500);
      res.sendFile(__dirname + `/public/html/down.html`);
    });
  } else {
    app
      .use(express.json())
      .use(express.urlencoded({ extended: true }))

      .use(express.static(path.join(__dirname + "/public")))
      .set("views", path.join(__dirname, "/views"))
      .use(session({ secret: process.env.expresssessionpassword, resave: false, saveUninitialized: false }))

      /* .use(async (request, response, next) => {
        request.user = request.session.user
        request.locale = request.user ? (request.user.locale === "fr" ? "fr-FR" : "en-US") : "en-US"

        next()
      }) */

      .use("/", require("./public/routes/main"))
      .use("/home", require("./public/routes/home"))
      .use("/ch1llstudios", require("./public/routes/ch1llstudios"))
      .use("/ch1llblox", require("./public/routes/ch1llblox"))
      .use("/api", require("./public/routes/api"))
    // .use("/logout", require("./public/routes/logout"))
    // .use("/manage", manage)
    // .use("/stats", stats)
    // .use("/settings", settings)

    app.use((req, res, next) => {
      res.status(404).sendFile(__dirname + "/public/html/404.html");
    });
  }
}

// Code //
console.log("-------- Loading Website --------");
RunWebsite();

// Listener //
if (Config.Debug === true) {
  const listener = app.listen(process.env.PORT, "127.0.0.1", () => {
    console.log(Chalk.blue(`SUCCESS - WEBSITE => Server running at http://127.0.0.1:${listener.address().port} & listening on port ${listener.address().port}.`));
  })
} else {
  const listener = app.listen(process.env.PORT, () => {
    console.log(Chalk.blue(`SUCCESS - WEBSITE => Server listening on port ${listener.address().port}.`));
  })
}