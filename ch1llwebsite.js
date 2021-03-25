// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log(require("chalk").green("LOADING STARTED - WEBSITE => Now loading website."))

// Librarys //
const express = require("express");
const favicon = require("serve-favicon")
const passport = require("passport-discord")
const helmet = require("helmet");
const path = require("path")
const Chalk = require("chalk")
const Config = require("./globalconfig.json")

// App //
const app = express();

// Functions //
async function RunWebsite() {
  if (Config.SystemsEnabled.Down === true) {
    app.use((req, res, next) => {
      res.status(500);
      res.sendFile(__dirname + `/public/html/down.html`);
    });
  } else {
    app
      .use(express.json())
      .use(express.urlencoded({ extended: true }))

      .use(express.static(path.join(__dirname + "/public")))
      .use(helmet())
      .use(helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: [`"self"`],
          scriptSrc: [
            `"self"`,
            "use.fontawesome.com"
          ],
          styleSrc: [
            `"self"`,
          ],
          imgSrc: [
            `"self"`,
            "data:",
            "imgur.com",
            "i.imgur.com",
            "discord.com",
            "cdn.discordapp.com"
          ],
          fontSrc: [
            `"self"`,
          ]
        }
      }))

      .use(favicon(__dirname + "/public/assets/images/favicon.ico"))
      .use(passport.initialize())
      .use(passport.session())


      .use("/", require("./public/routes/main"))
      .use("/home", require("./public/routes/home"))
      .use("/ch1llstudios", require("./public/routes/ch1llstudios"))
      .use("/ch1llblox", require("./public/routes/ch1llblox"))
      .use("/api", require("./public/routes/api"))
      // .use("/logout", require("./public/routes/logout"))
      // .use("/manage", manage)
      // .use("/stats", stats)
      // .use("/settings", settings)

      .use((req, res, next) => {
        res.status(404).sendFile(__dirname + "/public/html/404.html");
      });
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