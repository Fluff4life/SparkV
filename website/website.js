// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

// Librarys //
const fs = require("fs");
const http = require("http");
const path = require("path");
const parser = require("body-parser");
const Discord = require("discord.js");
const ejs = require("ejs");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SocketIo = require("socket.io");

const Render = require("./utils/Render");
const Config = require("../globalconfig.json");

// Files //
const MainDir = path.resolve(`${process.cwd()}${path.sep}website`);
const Views = path.resolve(`${MainDir}${path.sep}views`);

// App //
const app = express();
const server = http.createServer(app);

// Functions //
async function LoadRoutes() {
  function GetFiles(FilePath) {
    if (!FilePath) {
      return console.error("⛔ | You didn't provide a valid file path!");
    }

    if (!fs.existsSync(FilePath)) {
      fs.mkdirSync(FilePath);
    }

    const Files = fs
      .readdirSync(FilePath, { withFileTypes: true })
      .filter(entry => !entry.isDirectory())
      .map(entry => entry.name);

    return Files;
  }

  const RoutesPath = path.join(__dirname, "./routes");
  const routes = GetFiles(RoutesPath);

  if (!routes.length) {
    return;
  }

  routes.forEach(FileName => {
    const Route = require(path.join(RoutesPath, FileName));
    const RoutePath = FileName === "index.js" ? "/" : `/${FileName.slice(0, -3)}`;

    try {
      app.use(RoutePath, Route);
    } catch (err) {
      console.error(`⛔ | Uh oh! Looks like an error occured with loading route: ${FileName}. \n\n${err}`);
    }
  });
}

// Code //
console.log("-------- Website --------");
async function StartWebsite() {
  if (Config.Debug.Enabled === false) {
    require("newrelic");
  }

  require("./utils/passport");

  app.use(session({
    secret: process.env.secretid,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");

  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));

  app.use(require("serve-favicon")(path.resolve(`${MainDir}${path.sep}assets${path.sep}images${path.sep}site${path.sep}favicon.ico`)));

  app.use("/assets", express.static(path.resolve(`${MainDir}${path.sep}assets`)));
  app.set("views", Views);

  app.get("/service-worker.js", (request, response) => response.sendFile(path.resolve(__dirname, "utils", "service_worker.js")));

  LoadRoutes();

  app.use((request, response, next) => {
    if (!["/login"].includes(request.originalUrl) && !request.originalUrl.startsWith("/api")) {
      request.session.url = request.originalUrl;

      return next();
    }
  });

  app.use((request, response, next) => {
    response.status(404);

    Render(response, request, "404.ejs");
  });

  app.use((err, request, response, next) => {
    const user = request.user;

    console.error("Website Error!", err.stack);

    response.status(500);
    Render(response, request, "500.ejs", {
      head: {
        SiteTitle: "Home - KingCh1ll",
        SiteDescription: "KingCh1ll is a self-taught coder. He knows html, css, javascript, lua and more!",
        SiteKeywords:
          "KingCh1ll, King, Ch1ll, KingChill, Chill, Discord, Developer, Developer Discord, Discord Developer, Roblox, Roblox Developer, Developer Roblox",
      },

      // Navigation //
      navagation: {
        BrandName: "KingCh1ll",
        BrandLink: "#top",
        BrandLogo: "/assets/images/TransparentKingCh1ll.png",

        Links: {
          link1: {
            name: "Home",
            icon: "fas fa-home",
            link: "#top",
          },

          link2: {
            name: "Ch1llBlox",
            icon: "fas fa-robot",
            link: "/bot",
          },

          link3: {
            name: "Ch1ll Studios",
            icon: "fas fa-snowflake",
            link: "/ch1llstudios",
          },
        },
      },

      // Top //
      top: {
        BrandName: "Error!",
        BrandLogo: "/assets/images/500.png",
        TypeText: false,

        buttons: {
          button1: {
            name: "Back",
            link: "javascript:history.back()",
          },

          button2: {
            name: "Home",
            link: "/",
          },
        },

        backgroundURL: null,
        alert: null,
      },

      // Features //
      features: null,

      // Reviews //
      reviews: null,

      // Footer //
      footer: {
        Description: "Uh oh! An error occured. KingCh1ll is a self taught developer that enjoys coding. He knows many coding languages.",
      },
    });
  });

  server.listen(3000, () => {
    console.log("💻 | Server listening to port 3000.");
  });
}

StartWebsite();
