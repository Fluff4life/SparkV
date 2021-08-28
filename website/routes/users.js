const Express = require("express");

const Router = Express.Router();

const CheckAuth = require("../utils/CheckAuth");
const Render = require("../utils/Render");

Router.get("/", async (request, response) => {
    response.redirect("/404?reason=user_not_found");
});

Router.get("/:userID", async (request, response) => {
    if (!request.params.userID) {
        response.redirect("404?reason=user_not_found");
    }

    response.redirect(`/users/${request.params.userID}/profile`);
});

Router.get("/:userID/profile", async (request, response) => {
    if (!request.params.userID) {
        response.redirect("404?reason=invalid_args");
    }

    let User = await global.Database.get(
        `WebsiteData.Users.${request.params.userID}`
    );

    if (User) {
        Render(response, request, "profile.ejs", {
            head: {
                title: `Ch1ll | ${User.username} | Profile`,
                desc: `${User.username} is a user enjoying the benifits of using KingCh1ll's services. Including Ch1llBlox!`,
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
                            hyperlink1: {
                                name: "Home",
                                icon: "fas fa-home",
                                link: "/",
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
    } else {
        response.redirect("404?reason=404_not_found");
    }
});

module.exports = Router;
