const Express = require("express");

const Router = Express.Router();

const CheckAuth = require("../utils/CheckAuth");
const Render = require("../utils/Render");

Router.get("/:id", async (request, response) => {
  let user = await request.app.get("client").users.fetch(request.params.id).catch("404?reason=user_not_found");

  if (!user) {
    return;
  }

  if (!request.params.id) {
    response.redirect("404?reason=user_not_found");
  }

  if (!user) {
    return response.redirect("404?reason=404_not_found");
  } else {
    Render(response, request, "profile.ejs", {
      head: {
        title: `Ch1ll | ${User.username} | Profile`,
        desc: `${User.username} is a user enjoying the benifits of using KingCh1ll's services. Including Ch1llBlox!`
      },

      // Navigation //
      navagation: {
        BrandName: "Ch1ll",
        BrandLink: "#top",
        BrandLogo: "/assets/images/TransparentKingCh1ll.png",

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
            },
          },

          services: {
            name: "Services",
            icon: "fas fa-award",
            type: "dropdown",

            links: {
              hyperlink2: {
                name: "Ch1llBlox",
                icon: "fas fa-robot",
                link: "/bot",
              },
            },
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
            },
          },
        },
      },

      userdata: User,

      // Footer //
      footer: {
        Description:
          "Ch1llBlox is a multipurpose free Discord bot created by KingCh1ll. KingCh1ll is a self taught developer that enjoys coding. He knows many coding languages.",
      },
    });
  }
});

module.exports = Router;
