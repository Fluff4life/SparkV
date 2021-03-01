// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log("LOADING STARTED - WEBSITE => Now loading website.")

// Librarys //
const express = require("express");

const LocalHost = false

// App //
const app = express();
app.use(express.static("public"));

// Functions //
function RunWebsite() {
  if (process.env.Down === "true") {
    app.use((req, res, next) => {
      res.status(500);
      res.sendFile(__dirname + `/public/html/down.html`);
    });
  } else {
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

    if (process.env.BotOnline === "true") {
      app.get("/api/ch1llblox/status", (request, response) => {
        response.status(200).send({ status: 200, message: "OK" });
      });
    } else {
      app.get("/api/ch1llblox/status", (request, response) => {
        response
          .status(503)
          .send({ status: 503, message: "down for maintenance" });
      });
    }

    app.use((req, res, next) => {
      res.status(404);
      res.sendFile(__dirname + `/public/html/404.html`);
    });
  }
}

// Code //
console.log("-------- Loading Website --------");
RunWebsite();

// Listener //
if (LocalHost === "true"){
  const listener = app.listen(process.env.PORT, process.env.hostname, () => {
    console.log(`SUCCESS - WEBSITE => Server running at https://${process.env.hostname}:${listener.address().port} & listening on port ${listener.address().port}.`);
  })
} else {
  const listener = app.listen(process.env.PORT, () => {
    console.log(`SUCCESS - WEBSITE => Server listening on port ${listener.address().port}.`);
  })
}