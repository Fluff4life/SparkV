const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.redirect("/404?error=user_not_found")
})

Router.get("/:userID", async (request, response) => {
  if (!request.params.userID){
    response.redirect("404?error=user_not_found")
  }

  const userID = request.params.userID

  response.redirect(`/${userID}/profile`)
})

Router.get("/:userID/profile", global.CheckAuth, async (request, response) => {
  if (!request.params.userID){
    response.redirect("404?error=user_not_found")
  }

  response.send({ status: "error", message: "User found. However, page marked as incomplete by KingCh1ll.", user: Object.entries(request.user)})
})

module.exports = Router