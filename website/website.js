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

    const Files = fs.readdirSync(path.join(__dirname, "./routes"));

    return Files;
  }

  const RoutesPath = path.join(__dirname, "./routes");
  const routes = GetFiles(RoutesPath);

  if (!routes.length) {
    return;
  }

  for (const file of routes) {
    const name = file.split(".")[0].indexOf("index") > -1 ? "/" : `/${file.split(".")[0]}`;

    try {
      app.use(name, require(`${RoutesPath}/${name}`));
    } catch (err) {
      console.error(`⛔ | Uh oh! Looks like an error occured with loading route: ${FileName}. \n\n${err}`);
    }
  }
}

// Code //
console.log("-------- Website --------");
async function StartWebsite() {
  if (Config.Debug.Enabled === false) {
    require("newrelic");
  }

  app.use(require("compression"));

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

  app.use(require("serve-favicon")(path.resolve(`${process.cwd()}${path.sep}assets${path.sep}images${path.sep}site${path.sep}favicon.ico`)));

  app.use("/assets", express.static(path.resolve(`${process.cwd()}${path.sep}assets`)));
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
    // Page not found

    response.status(404);
    Render(response, request, "404.ejs");
  });

  app.use((err, request, response, next) => {
    console.error("Website Error!", err.stack);

    response.status(500);
    Render(response, request, "500.ejs");
  });

  server.listen(3000, () => {
    console.log("💻 | Server listening to port 3000.");
  });
}

StartWebsite();
