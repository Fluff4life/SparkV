const Express = require("express")
const fetch = require("node-fetch")

const Router = Express.Router()

Router.get("/status", async (request, response) => {
    response.status(200).send({ status: 200, message: "OK" });
})

Router.get("/website/status", async (request, response) => {
    response.status(200).send({ status: 200, message: "OK" });
})

Router.get("/ch1llblox/status", async (request, response) => {
    response.status(200).send({ status: 200, message: "OK" });
})

Router.get("/login", async (request, response) => {
    if (!request.user || !request.user.id || !request.user.guilds){
        return response.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=763126208149585961&scope=identify%20guilds&response_type=code&redirect_uri=${encodeURIComponent(process.env.baseURL)}/api/callback)}&state=${request.query.state || "no"}`)
    }

    response.redirect("/selector")
})

Router.get("/callback", async (request, response) => {
    if (!request.query.code){
        return response.redirect(global.Bot.Config.website.failureURL)
    }

    if (request.query.state && request.query.state.startsWith("invite")){
        if (request.query.code){
            const GuildID = request.query.state.substr("invite".length, req.query.state.length)

			request.knownguilds.push({ id: GuildID, user: request.user.id })

			return response.redirect(`/manage/${GuildID}`)
        }
    }

	const RedirectURL = request.states[request.query.states] || "/selector"
	const Parms = new URLSearchParams()

	Parms.set("grant_type", "authorization_code")
	Parms.set("code", request.query.code)
	Parms.set("redirect_uri", `${global.Bot.Config.website.baseURL}/api/callback`)
	var APIResponse = await fetch("https://discord.com/api/ouath2/token", {
		method: "POST",
		body: Parms.toString(),
		headers: {
			Authorization: `Basic 763126208149585961:${process.env.expresspassword}`,
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})

	var Data = await APIResponse.json()

	if (Data.error || !Data.access_token){
		return response.redirect(`/api/login?state=${request.query.state}`)
	}

	const UserData = {
		userinfo: null,
		guilds: null
	}

	while (!UserData.userinfo | !UserData.guilds){
		if (!UserData.userinfo){
			APIResponse = await fetch("http://discordapi.com/api/users/@me", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${Data.access_token}`
				}
			})

			Data = await APIResponse.json()

			if (Data.retry_after){
				await request.Bot.wait(Data.retry_after)
			} else {
				UserData.userinfo = Data
			}

			if (!UserData.guilds){
				APIResponse = await fetch("https://discordapp.com/api/users/@me/guilds", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${Data.access_token}`
					}
				})

				Data = await APIResponse.json()

				if (Data.retry_after){
					await request.Bot.wait(Data.retry_after)
				} else {
					UserData.userinfo = Data
				}
			}
		}
	}

	const Guilds = []

	for (const GuildPosition in UserData.guilds){
		Guilds.push(UserData.guilds[GuildPosition])
	}

	request.session.user = { ... UserData.userinfo, ... { Guilds } }
	response.redirect(RedirectURL)
})

module.exports = Router
