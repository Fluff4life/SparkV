// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

// Librarys //
const got = require("got")
const express = require("express")

// App //
const app = express()
app.use(express.static("public"))

// Functions //
function RunWebsite() {
  app.get("/home", (request, response) => {
    response.sendFile(__dirname + `/public/html/home.html`)
  })

  app.get("/ch1llstudios", (request, response) => {
    response.sendFile(__dirname + `/public/html/cshome.html`)
  })

  app.get("/ch1llblox", (request, response) => {
    response.sendFile(__dirname + `/public/html/ch1llblox.html`)
  })

  app.get("/", (request, response) => {
    response.redirect("/home")
  })

  app.get("/api/meme?", (request, response) => {
    if (!request.query.subreddit){
      return response.status(400).send({ code: 400, response: "Subreddit request not found. Make sure your request looks simular to /api/meme?subreddit=funny" })
    }

    got(`https://www.reddit.com/r/${request.query.subreddit}/random/.json`).then(ResponseData => {
        const [ list ] = JSON.parse(ResponseData.body)
        const [ post ] = list.data.children
        
        return response.status(200).send({ code: 200, response: post })
      })
    })

  app.get("/api/status", (request, response) => {
    response.status(200).send({ status: 200, message: "OK" })
  })

  if (process.env.BotOnline == "true"){
    app.get("/api/ch1llblox/status", (request, response) => {
      response.status(200).send({ status: 200, message: "OK" })
    })
  } else if (process.env.BotOnline == "false"){
    app.get("/api/ch1llblox/status", (request, response) => {
      response.status(503).send({ status: 503, message: "down for maintenance" })
    })
  } else {
    console.log("Unknown error gettings status of Ch1llBlox.")

    app.get("/api/ch1llblox/status", (request, response) => {
      response.status(500).send({ status: 500, message: "service unavailable" })
    })
  }

  app.use((req, res, next) => {
    res.status(404)
    res.sendFile(__dirname + `/public/html/404.html`)
  })
}

// Code //
console.log("--------// Loading Website //--------")
if (process.env.WebsiteOnline == "true") {
  RunWebsite()
} else if (process.env.WebsiteOnline == "false") {
  app.get("/api/status", (request, response) => {
    response.status(503).send({ status: 503, message: "down for mainmaintenance" })
  })

  app.use((req, res, next) => {
    res.sendFile(__dirname + `/public/html/down.html`)
  })
} else {
  console.log("Unknown error gettings status of website.")

  app.get("/api/status", (request, response) => {
    response.status(500).send({ status: 502, message: "service unavailable" })
  })
}

// Listener //
const listener = app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + listener.address().port + "!")
})
