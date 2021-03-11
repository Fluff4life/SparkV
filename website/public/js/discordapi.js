const express = require("express")
const fetch = require("node-fetch")
const btoa = require("btoa")

const Router = express.Router()
const WebsiteRedirect = encodeURIComponent("https://ch1ll.herokuapp.com/discordapi/callback")

Router.get("/login", (request, response) => {
    response.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=763126208149585961&scope=identify&response_type=code&redirect_uri=${WebsiteRedirect}`)
});

Router.get("/callback", async (request, response) => {
    if (!request.query.code) throw new Error('NoCodeProvided');

    const code = request.query.code
    const creds = btoa(`763126208149585961:${process.env.CLIENT_SECRET}`)
    const FetchResponse = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${WebsiteRedirect}`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${creds}`
        }
    })

    const json = await FetchResponse.json()
    response.redirect(`/?token=${json.access_token}`)
})

module.exports = Router