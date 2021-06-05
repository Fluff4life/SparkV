const Express = require("express")
const Router = Express.Router()

const CheckAuth = require("../CheckAuth")
const Render = require("../Render")

Router.get("/", async (request, response) => {
    response.redirect("/home")
})

Router.get("/jake", async (request, response) => {
    Render(response, request, "showoff.ejs", {
        head: {
          SiteTitle: "Home - Jake",
          SiteDescription: "Jake is a self-taught coder. He knows html, css, javascript, lua and more!",
          SiteKeywords: null
        },
    
        // Navigation //
        navagation: {
          BrandName: "Jake",
          BrandLink: "#top",
          BrandLogo: "/assets/images/Jake.png",
    
          Links: {
            link1: {
              name: "Home",
              icon: "fas fa-home",
              link: "#top",
            },
    
            link2: {
              name: "Ch1llBlox",
              icon: "fas fa-robot",
              link: "/bot",
            },
    
            link3: {
              name: "Ch1ll Studios",
              icon: "fas fa-snowflake",
              link: "/ch1llstudios",   
            }
          },
        },
    
        // Top //
        top: {
          BrandName: "Jake",
          BrandLogo: "/assets/images/Jake.png",
    
          buttons: {
            button1: {
              name: "Donate",
              link: "/donate"
            }
          },
    
          backgroundURL: null,
          alert: null
        },
    
        // Features //
        features: {
            features: {
                features1: {
                  name: "Games",
    
                  boxes: {
                      box1: {
                        name: "ROBLOX Videos Theater",
                        description: "Powering Roblox cartoons with a modern YouTube-like interface.",
                        link: "//www.roblox.com/games/5748202585/ROBLOX-Videos-Theater",
                        image: "/assets/images/RVT.png",
                        alt: "ROBLOX Videos Theater Icon"
                      },
    
                      box2: {
                        name: "Team Create",
                        description: "Work together to dominate over others. The rules are simple! One builds, one shoots. Easy, right?",
                        link: "//www.roblox.com/games/5451436770/Team-Create",
                        image: "/assets/images/TC.png",
                        alt: "Team Create Icon"
                      },
    
                      box3: {
                        name: "Message Me",
                        description: "Want to message me on Roblox with feedback? Do so in my game, Message Me!",
                        link: "//www.roblox.com/games/5196974140/Message-Me",
                        image: "/assets/images/ME.png",
                        alt: "Message Me Icon"
                      }
                  }
              },
    
              features2: {
                name: "Roblox Plugins",
    
                boxes: {
                    box1: {
                      name: "Studio Plus",
                      description: "Power Roblox Studio like never before. The ultimate features to improve your workflow!",
                      link: "//www.roblox.com/library/5699907726/Studio-Plus",
                      image: "/assets/images/studioplus.png",
                      alt: "Studio Plus Icon"
                    }
                }
              },
    
              features3: {
                name: "Discord Bots",
    
                boxes: {
                  box1: {
                    name: "Ch1llBlox",
                    description: "Premium bot with no $ involved!",
                    link: "/bot",
                    image: "/assets/images/Ch1llBlox.png",
                    alt: "Ch1llBlox Icon"
                  }
                }
              }
            }
        },
    
        // Reviews //
        reviews: null,
    
        // Footer //
        footer: {
          Description: "Jake is a self taught developer that enjoys coding. He knows many coding languages."
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
})

Router.get("/status", async (request, response) => {
    response.redirect("https://stats.uptimerobot.com/x84NBTJEkN")
})

Router.get("")

/* Fix for wrong redirects */
Router.get("/dashboard", async (request, response) => {
    response.redirect("/bot/dashboard")
})

module.exports = Router