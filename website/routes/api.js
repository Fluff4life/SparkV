const Express = require("express")
const url = require("url")
const passport = require("passport");

const Router = Express.Router()

const CheckAuth = require("../CheckAuth")
const Render = require("../Render");
const { request, response } = require("express");

Router.get("/status", async (request, response) => {
	response.status(200).send({ status: 200, message: "OK" });
})

Router.get("/website/status", async (request, response) => {
	response.status(200).send({ status: 200, message: "OK" });
})

Router.get("/ch1llblox/status", async (request, response) => {
	response.status(200).send({ status: 200, message: "OK" });
})

Router.get("/auth/discord", async (request, response, next) => {
	if (request.session.backURL) {
		request.session.backURL = request.session.backURL
	} else if (request.headers.referer) {
		const parsed = url.parse(request.headers.referer)

		request.session.backURL = parsed.path
	} else {
		request.session.backURL = "/"
	}

	next()
}, passport.authenticate("discord"))


Router.get("/auth/discord/callback", passport.authenticate("discord", { failureRedirect: "/500?error=invalid_discord_code" }), async (request, response, next) => {
	if (request.session.backURL) {
		const url = request.session.backURL

		request.session.backURL = null
		response.redirect(url)
	} else {
		response.redirect("/home")
	}
})

Router.get("/login", async (request, response, next) => {
	if (request.session.backURL) {
		request.session.backURL = request.session.backURL
	} else if (request.headers.referer) {
		const parsed = url.parse(request.headers.referer)

		request.session.backURL = parsed.path
	} else {
		request.session.backURL = "/"
	}

	next()
}, passport.authenticate("discord"))

Router.get("/userdata", CheckAuth, (request, response) => {
	response.send(Object.entries(request.user))
})

Router.get("/logout", CheckAuth, (request, response) => {
	request.session.destroy(() => {
		request.logout()
		response.redirect("/home")
	})
})

module.exports = Router