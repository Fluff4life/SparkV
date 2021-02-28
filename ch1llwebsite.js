// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log("LOADING STARTED - WEBSITE => Now loading website.")

// Librarys //
const got = require("got");
const express = require("express");

const down = false

// App //
const app = express();
app.use(express.static("public"));

// Functions //
function RunWebsite() {
  if (process.env.Down === "true"){
    app.use((req, res, next) => {
      res.status(500);
      res.sendFile(__dirname + `/public/html/down.html`);
    });

    return
  }

  app.get("/home", (request, response) => {
    response.sendFile(__dirname + `/public/html/home.html`);
  });

  app.get("/ch1llstudios", (request, response) => {
    response.sendFile(__dirname + `/public/html/cshome.html`);
  });

  app.get("/ch1llblox", (request, response) => {
    response.sendFile(__dirname + `/public/html/ch1llblox.html`);
  });

  app.get("/", (request, response) => {
    response.redirect("/home");
  });

  app.get("/api/status", (request, response) => {
    response.status(200).send({ status: 200, message: "OK" });
  });

  if (process.env.BotOnline == "true") {
    app.get("/api/ch1llblox/status", (request, response) => {
      response.status(200).send({ status: 200, message: "OK" });
    });
  } else if (process.env.BotOnline == "false") {
    app.get("/api/ch1llblox/status", (request, response) => {
      response
        .status(503)
        .send({ status: 503, message: "down for maintenance" });
    });
  } else {
    console.log("WARNING => Unknown error gettings status of Ch1llBlox.");

    app.get("/api/ch1llblox/status", (request, response) => {
      response
        .status(500)
        .send({ status: 500, message: "service unavailable" });
    });
  }

  app.use((req, res, next) => {
    res.status(404);
    res.sendFile(__dirname + `/public/html/404.html`);
  });
}

// Code //
console.log("-------- Loading Website --------");
RunWebsite();

// Listener //
const listener = app.listen(process.env.PORT, process.env.hostname, () => {
  console.log(`SUCCESS - WEBSITE => Server running at https://${process.env.hostname}:${listener.address().port} & listening on port ${listener.address().port}.`);
});