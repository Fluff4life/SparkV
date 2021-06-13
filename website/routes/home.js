const Express = require("express");
const Router = Express.Router();

const CheckAuth = require("../utils/CheckAuth")
const Render = require("../utils/Render")

Router.get("/", async (request, response) => {
  Render(response, request, "showoff.ejs", {
    head: {
      SiteTitle: "Home - KingCh1ll",
      SiteDescription: "KingCh1ll is a self-taught coder. He knows html, css, javascript, lua and more!",
      SiteKeywords: "KingCh1ll, King, Ch1ll, KingChill, Chill, Discord, Developer, Developer Discord, Discord Developer, Roblox, Roblox Developer, Developer Roblox",
    },

    // Navigation //
    navagation: {
      BrandName: "KingCh1ll",
      BrandLink: "#top",
      BrandLogo: "/assets/images/kingch1ll.png",

      Links: {
        learn: {
          name: "Learn",
          icon: "fas fa-book",
          type: "dropdown",

          links: {
            hyperlink1: {
              name: "About Us",
              icon: "fas fa-openbook",
              link: "/about",
            },
          }
        },

        products: {
          name: "Products",
          icon: "fas fa-award",
          type: "dropdown",

          links: {
            hyperlink1: {
              name: "Home",
              icon: "fas fa-home",
              link: "/home",
            },

            hyperlink2: {
              name: "Ch1llBlox",
              icon: "fas fa-robot",
              link: "/bot",
            },

            hyperlink3: {
              name: "Ch1ll Studios",
              icon: "fas fa-snowflake",
              link: "/ch1llstudios",
            }
          }
        },

        support: {
          name: "Support",
          icon: "far fa-question-circle",
          type: "dropdown",

          links: {
            hyperlink1: {
              name: "err",
              icon: "fas fa-home",
              link: "#top",
            },
          }
        },
      },
    },

    // Top //
    top: {
      BrandName: "KingCh1ll",
      BrandLogo: "/assets/images/kingch1ll.png",

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
      Description: "KingCh1ll is a self taught developer that enjoys coding. He knows many coding languages."
    },
  });
});

module.exports = Router;