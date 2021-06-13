const Express = require("express")

const Router = Express.Router()

const CheckAuth = require("../utils/CheckAuth")
const Render = require("../utils/Render")

Router.get("/:id", async (request, response) => {
    if (!request.params.id) {
        response.redirect("404?reason=user_not_found")
    }

    let user = await request.app.get("client").users.fetch(request.params.id).catch("404?reason=user_not_found")

    if (!user) {
        return response.redirect("404?reason=404_not_found")
    } else {
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
                                link: "/about"
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

            userdata: User,

            // Footer //
            footer: {
                Description: "Ch1llBlox is a multipurpose free Discord Bot created by KingCh1ll. KingCh1ll is a self taught developer that enjoys coding. He knows many coding languages."
            },
        });
    }
})

module.exports = Router
