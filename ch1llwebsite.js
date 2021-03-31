// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log(require("chalk").green("LOADING STARTED - WEBSITE => Now loading website."))

// Librarys //
const express = require("express");
const favicon = require("serve-favicon")
const helmet = require("helmet");
const path = require("path")
const Chalk = require("chalk")
const session = require("express-session");
const dashboard = require("discord-bot-dashboard")
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

      .use(express.static(path.join(__dirname + "/public")))
      .set("views", __dirname + "/views")

      .use(helmet())
      .use(helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: [`'self'`],
          scriptSrc: [
            `'self'`,
            "use.fontawesome.com",
            'ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
            "cdn.jsdelivr.net",
            "www.google-analytics.com"
          ],
          styleSrc: [
            `'self'`,
            'ch1ll.herokuapp.com',
            "use.fontawesome.com",
            "cdn.jsdelivr.net",
          ],
          imgSrc: [
            `'self'`,
            "data:",
            "imgur.com",
            "i.imgur.com",
            "discord.com",
            "cdn.discordapp.com",
            "www.roblox.com",
            "t0.rbxcdn.com",
            "t1.rbxcdn.com",
            "t2.rbxcdn.com",
            "t3.rbxcdn.com",
            "t4.rbxcdn.com",
            "t5.rbxcdn.com",
            "t6.rbxcdn.com"
          ],
          fontSrc: [
            `'self'`,
            "use.fontawesome.com"
          ]
        }
      }))
      .use(session({ secret: process.env.expresspassword, resave: false, saveUninitialized: false }))

      .use(favicon(__dirname + "/public/assets/images/favicon.ico"))
      
      .use(async (request, response, next) => {
        request.user = request.session.user
        request.Bot = Bot
        request.states = []
        
        next()
      })

      //.use("/", require("./public/routes/main"))
      //.use("/home", require("./public/routes/home"))
      .use("/api", require("./public/routes/api"))
      //.use("/logout", require("./public/routes/logout"))


      //.use("/ch1llstudios", require("./public/routes/ch1llstudios"))
      //.use("/ch1llblox", require("./public/routes/ch1llblox"))


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

      global.Bot.Dashboard = new dashboard(global.Bot, {
        port: parseInt(process.env.port), 
        clientSecret: process.env.secretid,
        redirectURI: `${Config.website.baseURL}/auth/discord/callback`,
        maintenanceNotification: process.env.BotEnabled === "true" ? true : false,
        maintenanceGame: "Maintence Enabled. Please check back later!",
        maintenanceStatus: "idle"
      });
  }
}

// Code //
console.log("-------- Loading Website --------");
RunWebsite();

// Listener //
if (Config.Debug === true) {
  const listener = app.listen(process.env.port, "localhost", () => {
    console.log(Chalk.blue(`SUCCESS - WEBSITE => Server running at http://localhost:${listener.address().port} & listening on port ${listener.address().port}.`));
  })
} else {
  const listener = app.listen(process.env.port, () => {
    console.log(Chalk.blue(`SUCCESS - WEBSITE => Server listening on port ${listener.address().port}.`));
  })
}