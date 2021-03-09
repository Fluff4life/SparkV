// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log("LOADING STARTED - WEBSITE => Now loading website.")

// Librarys //
const express = require("express");
const Session = require("express-session");
const BodyParser = require("body-parser");

// App //
const app = express();
app.use(express.static("public"));
app.use(Session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(BodyParser.urlencoded({extended : true}));
app.use(BodyParser.json());

// Functions //
async function RunWebsite() {
  const Database = await require("./database/connector").Database

  if (process.env.Down === "true") {
    app.use((req, res, next) => {
      res.status(500);
      res.sendFile(__dirname + `/public/html/down.html`);
    });
  } else {
    app.get("/", (request, response) => {
      response.sendFile(__dirname + `/public/html/login.html`)
    });

    app.post("/auth", (request, response) => {
      var username = request.body.username
      var password = request.body.password

      if (username && password){
        var Account = Database.get(`WebsiteAccounts.${username}`)

        if (Account.password === password){
          request.session.loggedin = true
          request.session.username = username
          response.redirect("/home")
        } else {
          response.send("Incorrect Username and/or Password.")
        }
        response.end()
      } else {
        response.send("Please enter a username & password.")
        response.end()
      }
    })

    app.get("/home", (request, response) => {
      if (request.session.loggedin){
        response.sendFile(__dirname + `/public/html/home.html`);
      } else {
        response.sendFile(__dirname + `/public/html/login.html`);
      }

      response.end()
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
if (process.env.LocalHost === "true"){
  const listener = app.listen(process.env.PORT, process.env.hostname, () => {
    console.log(`SUCCESS - WEBSITE => Server running at http://${process.env.hostname}:${listener.address().port} & listening on port ${listener.address().port}.`);
  })
} else {
  const listener = app.listen(process.env.PORT, () => {
    console.log(`SUCCESS - WEBSITE => Server listening on port ${listener.address().port}.`);
  })
}