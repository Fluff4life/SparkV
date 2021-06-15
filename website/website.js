// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log(require("chalk").green("LOADING STARTED - WEBSITE => Now loading website."));

// Librarys //
const express = require("express");
const session = require("express-session");
const ejs = require("ejs");

const passport = require("passport");

const path = require("path");
const fs = require("fs")
const parser = require("body-parser");

const Config = require("../globalconfig.json");
const Render = require("./utils/Render");
const Discord = require("discord.js");

// Files //
const MainDir = path.resolve(`${process.cwd()}${path.sep}website`);
const Views = path.resolve(`${MainDir}${path.sep}views`);

// App //
const app = express();
const server = app.listen(Config.Debug.Enabled == true ? 3000 : process.env.PORT);
const io = require("socket.io")(server)

// Functions //
async function LoadRoutes(){
  function GetFiles(FilePath) {
    if (!FilePath) {
      return console.error("You didn't provide a valid file path!")
    }

    if (!fs.existsSync(FilePath)) {
      fs.mkdirSync(FilePath)
    }

    const Files = fs.readdirSync(FilePath, { withFileTypes: true })
      .filter((entry) => !entry.isDirectory())
      .map((entry) => entry.name)

    return Files
  }

  const RoutesPath = path.join(__dirname, "./routes")
  const routes = GetFiles(RoutesPath)

  if (!routes.length) {
    return
  }

  routes.forEach((FileName) => {
    const Route = require(path.join(RoutesPath, FileName))
    const RoutePath = FileName === "index.js" ? "/" : `/${FileName.slice(0, -3)}`

    try {
      app.use(RoutePath, Route)
    } catch (err) {
      console.error(`Uh oh! Looks like an error occured with loading route: ${FileName}. \n\n${err}`)
    }
  })
}

// Code //
console.log("-------- Loading Website --------");
async function StartWebsite(Bot){
  if (Config.Debug.Enabled === false) {
    require("newrelic")
  }
  
  global.UserShema = require("../modules/models/UserData")

  require("./utils/passport")
  
  app.use(session({
    secret: process.env.secretid,
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");

  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));
  
  app.use(require("serve-favicon")(path.resolve(`${MainDir}${path.sep}assets${path.sep}images${path.sep}siteicons${path.sep}favicon.ico`)));
  
  app.use("/assets", express.static(path.resolve(`${MainDir}${path.sep}assets`)));
  app.set("views", Views)
  
  LoadRoutes()
  
  app.use((request, response, next) => {
    response.status(404)
  
    Render(response, request, "error.ejs", {
      head: {
        SiteTitle: "404 - Not Found",
        SiteDescription: "Uh oh! Looks like the page you where looking for wasn't found. Dang man. KingCh1ll is a self-taught coder. He knows html, css, javascript, lua and more!",
        SiteKeywords: "KingCh1ll, King, Ch1ll, KingChill, Chill, Discord, Developer, Developer Discord, Discord Developer, Roblox, Roblox Developer, Developer Roblox",
      },
  
      // Navigation //
      navagation: {
        BrandName: "Ch1ll",
        BrandLink: "/home",
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
  
      // Top //
      top: {
        BrandName: `404 - Not Found`,
        BrandLogo: "/assets/images/404.png",
  
        buttons: {
          button1: {
            name: "Back",
            link: "javascript:history.back()"
          },
  
          button2: {
            name: "Home",
            link: "/home"
          },
        },
  
        backgroundURL: null,
        alert: null
      },
  
      // Features //
      features: null,
  
      // Reviews //
      reviews: null,
  
      // Footer //
      footer: {
        Description: "KingCh1ll is a self taught developer that enjoys coding. He knows many coding languages."
      },
    });
  });
  
  app.use((err, request, response, next) => {
    const user = request.user
    const MainEmbed = new Discord.MessageEmbed()
      .setTitle("Error Occured!")
      .setDescription(`Uh oh! Looks like an error occured for ${user ? user.username : "unknown"}${user ? "#" + user.descriminator : ""}.`)
      .addField("**ERROR**", err, true)
      .setFooter(`Ch1ll Notifier | Error Code 500 | ${user ? user.username : "unknown"}#${user ? "#" + user.descriminator : ""}`)
      .setColor("RED")
  
    global.MainWebhook.send({
      username: "Ch1ll Notifier",
      avatarURL: user ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024` : "https://support.discord.com/hc/user_images/l12c7vKVRCd-XLIdDkLUDg.png",
      embeds: [
        MainEmbed
      ]
    })
  
    console.error("Website Error!", err.stack);
  
    response.status(500)
    Render(response, request, "error.ejs", {
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
        BrandName: "Error!",
        BrandLogo: "/assets/images/500.png",
  
        buttons: {
          button1: {
            name: "Back",
            link: "javascript:history.back()"
          },
  
          button2: {
            name: "Home",
            link: "/home"
          },
        },
  
        backgroundURL: null,
        alert: null
      },
  
      // Features //
      features: null,
  
      // Reviews //
      reviews: null,
  
      // Footer //
      footer: {
        Description: "Uh oh! An error occured. KingCh1ll is a self taught developer that enjoys coding. He knows many coding languages."
      },
    });
  });
  
  io.on("PrefixUpdated", async (prefix, id) => {
    // TODO
  })
  
  console.log(`SUCCESS - WEBSITE => Website successfully deployed!`)
}

StartWebsite(null)