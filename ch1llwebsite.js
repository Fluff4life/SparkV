// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log("LOADING STARTED - WEBSITE => Now loading website.")

// Librarys //
const express = require("express");
const Session = require("express-session");
const BodyParser = require("body-parser");
const fetch = require("node-fetch")
const btoa = require("btoa")

// App //
const app = express();
app.use(express.static("public"));
app.use(Session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// Functions //
async function RunWebsite() {
  if (process.env.Down === "true") {
    app.use((req, res, next) => {
      res.status(500);
      res.sendFile(__dirname + `/public/html/down.html`);
    });
  } else {
    // app.use("/discordapi", require("./public/discordapi"))

    app.get("/", (request, response) => {
      response.redirect("/home")
    });

    app.get("/home", (request, response) => {
      // if (request.session.loggedin) {
        // response.status(200).sendFile(__dirname + `/public/html/home.html`);
      // } else {
        response.status(200).sendFile(__dirname + `/public/html/home.html`);
      // }
    });

    app.get("/ch1llstudios", (request, response) => {
      response.sendFile(__dirname + `/public/html/cshome.html`);
    });

    app.get("/ch1llblox", (request, response) => {
      response.sendFile(__dirname + `/public/html/ch1llblox.html`);
    });

    app.get("/api/status", (request, response) => {
      response.status(200).send({ status: 200, message: "OK" });
    });

    app.get("/ch1llblox/donate", (request, response) => {
      response.status.send(404).send({ status: 404, message: "Error displaying this page: This page is under construction. Please come back soon!" })
    });

    app.get("/api/ch1llblox/status", (request, response) => {
      response.status(process.env.BotOnline).send({ status: process.env.BotOnline });
    });

    app.use((req, res, next) => {
      res.status(404).sendFile(__dirname + `/public/html/404.html`);
    });
  }
}

// Code //
console.log("-------- Loading Website --------");
RunWebsite();

// Listener //
if (process.env.Debug || false === "true") {
  const listener = app.listen(process.env.PORT, "127.0.0.1", () => {
    console.log(`SUCCESS - WEBSITE => Server running at http://127.0.0.1:${listener.address().port} & listening on port ${listener.address().port}.`);
  })
} else {
  const listener = app.listen(process.env.PORT, () => {
    console.log(`SUCCESS - WEBSITE => Server listening on port ${listener.address().port}.`);
  })
}