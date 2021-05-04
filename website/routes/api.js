const Express = require("express")
const url = require("url")
const passport = require("passport");

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

Router.get("/login", async (request, response, next) => {
	if (request.session.backURL){
		request.session.backURL = request.session.backURL
	} else if (request.headers.referer){
		const parsed = url.parse(request.headers.referer)

		request.session.backURL = parsed.path
	} else {
		request.session.backURL = "/"
	}

	next()
}, passport.authenticate("discord"))

Router.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), async (request, response) => {
	if (request.session.backURL){
		const url = request.session.backURL

		request.session.backURL = null
		response.redirect(url)
	} else {
		response.redirect("/")
	}
})

Router.get("/logout", (request, response) => {
	request.session.destroy(() => {
		request.logout()
		response.redirect("/")
	})
})

module.exports = Router