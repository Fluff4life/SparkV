const Express = require("express")
const url = require("url")
const passport = require("passport");

const Router = Express.Router()

const CheckAuth = require("../../utils/CheckAuth")
const Render = require("../../utils/Render");

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

Router.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), async (request, response, next) => {
	if (request.session.backURL) {
		const url = request.session.backURL

		request.session.backURL = null
		response.redirect(url)
	} else {
		response.redirect("/home")
	}
})

module.exports = Router