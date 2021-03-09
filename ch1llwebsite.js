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
app.use(BodyParser.urlencoded({extended : true}));
app.use(BodyParser.json());

// Functions //
async function RunWebsite() {
  if (process.env.Down === "true") {
    app.use((req, res, next) => {
      res.status(500);
      res.sendFile(__dirname + `/public/html/down.html`);
    });
  } else {
    app.get("/", (request, response) => {
      response.status(200).sendFile(__dirname + `/public/html/login.html`)
    });

    app.get("/login", (request, response) => {
      response.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=763126208149585961&scope=identify&response_type=code&redirect_uri=${redirect}`)
    });

    app.get("/callback", async (request, response) => {
      if (!request.query.code){
        return response.status(404)
      }

      const code = request.query.code
      const creds = btoa(`763126208149585961:${process.env.CLIENT_SECRET}`)
      const FetchReqponse = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${creds}`
        }
      })
    
      const json = await response.json()
      response.redirect(`/?token=${json.access_token}`)
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