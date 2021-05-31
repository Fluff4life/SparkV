const Express = require("express")

const Router = Express.Router()

const CheckAuth = require("../CheckAuth")
const Render = require("../Render")

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

Router.get("/:userID/profile", async (request, response) => {
  if (!request.params.userID){
    response.redirect("404?error=invalid_arguments")
  }

  let User = await global.Database.get(`WebsiteData.Users.${request.params.userID}`)

  if (User) {
    Render(response, request, "profile.ejs", {
      head: {
        SiteTitle: `Ch1ll | ${User.username} | Profile`,
        SiteDescription: `${User.username} is a user enjoying the benifits of using KingCh1ll's services. Including Ch1llBlox!`,
        SiteKeywords: "KingCh1ll, King, Ch1ll, KingChill, Chill, Discord, Developer, Developer Discord, Discord Developer, Roblox, Roblox Developer, Developer Roblox",
      },
  
      // Navigation //
      navagation: {
        BrandName: "Ch1ll",
        BrandLink: "#top",
        BrandLogo: "/assets/images/ch1llblox.png",
  
        Links: {
          link1: {
            name: "Ch1llBlox",
            icon: "fas fa-robot",
            link: "#top",
          },
  
          link2: {
            name: "Home",
            icon: "fas fa-home",
            link: "/home",
          },
  
          link3: {
            name: "Ch1ll Studios",
            icon: "fas fa-snowflake",
            link: "/ch1llstudios",   
          }
        },
      },
  
      userdata: User,
  
      // Footer //
      footer: {
        Description: "Ch1llBlox is a multipurpose free Discord Bot created by KingCh1ll. KingCh1ll is a self taught developer that enjoys coding. He knows many coding languages."
      },
  
      // Scripts //
      scripts: {
        jquery: true,
        popper: true,
        bootstrap: true,
        wow: true,
        smoothscroll: true,
        autohidingnavbar: true,
        pace: true,
        typed: true
      }
    });
  } else {
    response.redirect("404?error=404_not_found")
  }
})

module.exports = Router