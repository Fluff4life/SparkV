const Discord = require("discord.js")
const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
  global.RenderTemplate(response, request, "site.ejs", {
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

      linkname: "Ch1llBlox",
      linkicon: "fas fa-robot",
      link: "#top",

      linkname2: "Home",
      linkicon2: "fas fa-home",
      link2: "/home",

      linkname3: "Ch1ll Studios",
      linkicon3: "fas fa-snowflake",
      link3: "/ch1llstudios",

      linkname4: "",
      linkicon4: "",
      link4: "",

      linkname5: "",
      linkicon5: "",
      link5: "",
    },

    // Top //
    top: {
      BrandName: "Ch1llBlox",
      BrandLogo: "/assets/images/Ch1llBlox.png",

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
    global.RenderTemplate(response, request, "ch1llblox/botcmds.ejs")
})

Router.get("/donate", async (request, response) => {
    global.RenderTemplate(response, request, "ch1llblox/donate.ejs")
})

Router.get("/faq", async (request, response) => {
    global.RenderTemplate(response, request, "ch1llblox/faq.ejs")
})

Router.get("/dashboard", global.CheckAuth, async (request, response) => {
    global.RenderTemplate(response, request, "ch1llblox/dashboard.ejs", { perms: Discord.Permissions })
})

Router.get("/dashboard/:guildID", global.CheckAuth, async (request, response) => {
  const guild = request.Bot.guilds.cache.get(request.params.guildID) || request.user.guilds.find(guild => guild.id === request.params.guildID)

  if (!guild){
    return response.redirect("/bot/dashboard")
  }

  const GuildPermisions = new Discord.Permissions(guild.permissions)

  if (!GuildPermisions || !GuildPermisions.has("MANAGE_GUILD")){
    return response.redirect("/bot/dashboard")
  }

  let StoredSettings = await global.Database.get(`WebsiteData.GuildSettings.${guild.id}`)

  if (!StoredSettings){
    await global.Database.set(`WebsiteData.GuildSettings.${guild.id}`, guild.id)
    StoredSettings = await global.Database.get(`WebsiteData.GuildSettings.${guild.id}`)
  }

  global.RenderTemplate(response, request, "ch1llblox/settings.ejs", {guild, settings: { StoredSettings }, alert: null })
})


Router.post("/dashboard/:guildID", global.CheckAuth, async (request, response) => {
  const guild = request.user.guilds.find(guild => guild.id === request.params.guildID)

  if (!guild){
    return response.redirect("/bot/dashboard")
  }

  const GuildPermisions = new Discord.Permissions(guild.permissions)

  if (!GuildPermisions || !GuildPermisions.has("MANAGE_GUILD")){
    return response.redirect("/bot/dashboard")
  }

  let StoredSettings

  try {
    StoredSettings = await global.Database.get(`WebsiteData.GuildSettings.${guild.id}`)

    if (!StoredSettings){
      await global.Database.set(`WebsiteData.GuildSettings.${guild.id}`, guild.id)
      StoredSettings = await global.Database.get(`WebsiteData.GuildSettings.${guild.id}`)
    }

    await global.Database.set(`WebsiteData.GuildSettings.${guild.id}.${request.body.prefix}`, request.body.prefix)
  } catch (err) {
    global.RenderTemplate(response, request, "ch1llblox/settings.ejs", { guild, settings: StoredSettings, alert: "Settings failed to save." })
  }

  global.RenderTemplate(response, request, "ch1llblox/settings.ejs", { guild, settings: StoredSettings, alert: "Settings successfully saved!" })
})

module.exports = Router