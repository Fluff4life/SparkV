// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log(require("chalk").green("LOADING STARTED - WEBSITE => Now loading website."));

// Librarys //
const express = require("express");
const session = require("express-session");
const favicon = require("serve-favicon");
const path = require("path");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const ejs = require("ejs");
const Chalk = require("chalk");
const Config = require("../globalconfig.json");
const bodyParser = require("body-parser");

// Files //
const MainDir = path.resolve(`${process.cwd()}${path.sep}website`);
const Views = path.resolve(`${MainDir}${path.sep}views`);
const Domain = Config.Debug === true ? "http://localhost:3000" : `https://${process.env.baseURL}`;

// App //
const app = express();
const memory = require("memorystore")(session);

// Code //
console.log("-------- Loading Website --------");
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new Strategy({
  clientID: "763126208149585961",
  clientSecret: process.env.secretid,
  callbackURL: `${Domain}/api/callback`,
  scope: ["identify", "guilds"],
},
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }
)
);

app.use(session({
  store: new memory({ checkPeriod: 86400 * 1000 }),
  secret: process.env.secretid,
  resave: false,
  saveUninitialized: false,
})
);

app.use(passport.initialize());
app.use(passport.session());

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  favicon(
    path.resolve(
      `${MainDir}${path.sep}assets${path.sep}images${path.sep}favicon.ico`
    )
  )
);

app.use("/assets", express.static(path.resolve(`${MainDir}${path.sep}assets`)));
app.set("views", Views)

const RenderTemplate = (response, request, view, data) => {
  if (!data) {
    data = {};
  }

  const BaseData = {
    path: request.path,
    bot: global.Bot,
    user: request.isAuthenticated() ? request.user : null,
  };

  response.render(view, Object.assign(BaseData, data));
};

const CheckAuth = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }

  request.session.backURL = request.url;
  response.redirect("/api/login");
};

global.RenderTemplate = RenderTemplate;
global.CheckAuth = CheckAuth;

app.use("/", require("./routes/main"));
app.use("/home", require("./routes/home"));
app.use("/bot", require("./routes/bot"));
app.use("/api", require("./routes/api"));

app.use((request, response, next) => {
  response.status(404)
  RenderTemplate(response, request, "404.ejs");
});

app.use((err, request, response, next) => {
  console.error("Website Error!", err.stack);

  response.status(500)
  RenderTemplate(response, request, "500.ejs", { error: err });
});

const listener = app.listen(Config.Debug == true ? 3000 : process.env.PORT, Config.Debug == true ? "localhost" : null, () => {
  console.log(Chalk.blue(`SUCCESS - WEBSITE => ${Config.Debug == true ? `Server running at http://localhost:3000` : `Server running on port ${listener.address().port}`}`));
});
