const Discord = require("discord.js")
const Express = require("express")

const Router = Express.Router()

const CheckAuth = require("../CheckAuth")
const Render = require("../Render")

Router.get("/", async (request, response) => {
  Render(response, request, "site.ejs", {
    head: {
      SiteTitle: "Home - Ch1llBlox",
      SiteDescription: "Ch1llBlox is a Discord Bot",
      SiteKeywords: "KingCh1ll, King, Ch1ll, KingChill, Chill, Discord, Developer, Developer Discord, Discord Developer, Roblox, Roblox Developer, Developer Roblox",
    },

    // Navigation //
    navagation: {
      BrandName: "Ch1llBlox",
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

    // Top //
    top: {
      BrandName: "Ch1llBlox",
      BrandLogo: "/assets/images/Ch1llBlox.png",

      buttons: {
        button1: {
          name: "Invite",
          link: "/invite"
        },

        button2: {
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
          name: "Features",

          boxes: {
            box1: {
              name: "24/7 Uptime",
              description: "Don't worry about Ch1llBlox going offline! Ch1llBlox will always be online 24/7. If he is spotted offline, get support in our support server.",
              link: "#top",
              image: "/assets/images/lightningbolt.png",
              alt: "Lightning Bolt Icon"
            }
          }
        },
      }
    },

    // Reviews //
    reviews: null,

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
})

Router.get("/commands", async (request, response) => {
  Render(response, request, "ch1llblox/botcmds.ejs")
})

Router.get("/donate", async (request, response) => {
  Render(response, request, "ch1llblox/donate.ejs")
})

Router.get("/faq", async (request, response) => {
  Render(response, request, "ch1llblox/faq.ejs")
})

Router.get("/dashboard", CheckAuth, async (request, response) => {
  Render(response, request, "ch1llblox/dashboard.ejs", { perms: Discord.Permissions })
})

Router.get("/dashboard/:guildID", CheckAuth, async (request, response) => {
  const guild = request.Bot.guilds.cache.get(request.params.guildID) || request.user.guilds.find(guild => guild.id === request.params.guildID)

  if (!guild) {
    return response.redirect("/bot/dashboard")
  }

  const GuildPermisions = new Discord.Permissions(guild.permissions)

  if (!GuildPermisions || !GuildPermisions.has("MANAGE_GUILD")) {
    return response.redirect("/bot/dashboard")
  }

  let StoredSettings = await global.Database.get(`WebsiteData.GuildSettings.${guild.id}`)

  if (!StoredSettings) {
    await global.Database.set(`WebsiteData.GuildSettings.${guild.id}`, guild.id)
    StoredSettings = await global.Database.get(`WebsiteData.GuildSettings.${guild.id}`)
  }

  Render(response, request, "ch1llblox/settings.ejs", { guild, settings: { StoredSettings }, alert: null })
})


Router.post("/dashboard/:guildID", CheckAuth, async (request, response) => {
  const guild = request.user.guilds.find(guild => guild.id === request.params.guildID)

  if (!guild) {
    return response.redirect("/bot/dashboard")
  }

  const GuildPermisions = new Discord.Permissions(guild.permissions)

  if (!GuildPermisions || !GuildPermisions.has("MANAGE_GUILD")) {
    return response.redirect("/bot/dashboard")
  }

  let StoredSettings

  try {
    StoredSettings = await global.Database.get(`WebsiteData.GuildSettings.${guild.id}`)

    if (!StoredSettings) {
      await global.Database.set(`WebsiteData.GuildSettings.${guild.id}`, guild.id)
      StoredSettings = await global.Database.get(`WebsiteData.GuildSettings.${guild.id}`)
    }

    await global.Database.set(`WebsiteData.GuildSettings.${guild.id}.${request.body.prefix}`, request.body.prefix)
  } catch (err) {
    Render(response, request, "ch1llblox/settings.ejs", { guild, settings: StoredSettings, alert: "Settings failed to save." })
  }

  Render(response, request, "ch1llblox/settings.ejs", { guild, settings: StoredSettings, alert: "Settings successfully saved!" })
})

module.exports = Router