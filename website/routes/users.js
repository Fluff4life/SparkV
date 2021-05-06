const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.redirect("/404?error=user_not_found")
})

Router.get("/:userID", global.CheckAuth, async (request, response) => {
  response.redirect("404?error=user_not_found")
})

Router.get("/:userID", global.CheckAuth, async (request, response) => {
  if (!request.params.userID){
    response.redirect("404?error=user_not_found")
  }

  response.redirect("404?error=user_not_found")
  
  // Todo: Add custom user pages.
})

module.exports = Router