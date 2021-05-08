const Discord = require("discord.js")
const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    global.RenderTemplate(response, request, "ch1llblox/bot.ejs")
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
  const guild = request.user.guilds.find(guild => guild.id === request.params.guildID)

  if (!guild){
    return response.redirect("/bot/dashboard")
  }

  const GuildPermisions = new Discord.Permissions(guild.permissions)

  if (!GuildPermisions || !GuildPermisions.has("MANAGE_GUILD")){
    return response.redirect("/bot/dashboard")
  }

  /*
  let StoredSettings = await global.Bot.Database.get(`WebsiteData.GuildSettings.${guild.id}`)

  if (!StoredSettings){
    await global.Bot.Database.set(`WebsiteData.GuildSettings.${guild.id}`, guild.id)
    StoredSettings = await global.Bot.Database.get(`WebsiteData.GuildSettings.${guild.id}`)
  }
  */

  global.RenderTemplate(response, request, "ch1llblox/settings.ejs", {guild, settings: { prefix: "^" }, alert: null })
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
    StoredSettings = await global.Bot.Database.get(`WebsiteData.GuildSettings.${guild.id}`)

    if (!StoredSettings){
      await global.Bot.Database.set(`WebsiteData.GuildSettings.${guild.id}`, guild.id)
      StoredSettings = await global.Bot.Database.get(`WebsiteData.GuildSettings.${guild.id}`)
    }

    await global.Bot.Database.set(`WebsiteData.GuildSettings.${guild.id}.${request.body.prefix}`, request.body.prefix)
  } catch (err) {
    global.RenderTemplate(response, request, "ch1llblox/settings.ejs", { guild, settings: StoredSettings, alert: "Settings failed to save." })
  }

  global.RenderTemplate(response, request, "ch1llblox/settings.ejs", { guild, settings: StoredSettings, alert: "Settings successfully saved!" })
})

module.exports = Router