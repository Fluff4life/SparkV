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
  const guild = global.Bot.guilds.cache.get(request.params.guildID)

  if (!guild){
    return response.redirect("/bot/dashboard")
  }

  const member = guild.members.cache.get(request.user.id)

  if (!member){
    return response.redirect("/bot/dashboard")
  }

  if (!member.permissions.has("MANAGE_GUILD")){
    return response.redirect("/bot/dashboard")
  }

  let StoredSettings = await global.Bot.Database.get(`WebsiteData.GuildSettings.${guild.id}`)

  if (!StoredSettings){
    StoredSettings = await global.Bot.Database.set(`WebsiteData.GuildSettings.${guild.id}`, guild.id)
  }

  global.RenderTemplate(response, request, "settings.ejs", { guild, settings: StoredSettings, alert: null })
})

Router.post("/dashboard/:guildID", global.CheckAuth, async (request, response) => {
  const guild = global.Bot.guilds.cache.get(request.params.guildID)

  if (!guild){
    return response.redirect("/bot/dashboard")
  }

  const member = guild.members.cache.get(request.user.id)

  if (!member){
    return response.redirect("/bot/dashboard")
  }

  if (!member.permissions.has("MANAGE_GUILD")){
    return response.redirect("/bot/dashboard")
  }

  let StoredSettings = await global.Bot.Database.get(`WebsiteData.GuildSettings.${guild.id}`)

  if (!StoredSettings){
    StoredSettings = await global.Bot.Database.set(`WebsiteData.GuildSettings.${guild.id}`, guild.id)
  }

  await global.Bot.Database.set(`WebsiteData.GuildSettings.${guild.id}.${request.body.prefix}`, request.body.prefix)

  global.RenderTemplate(response, request, "settings.ejs", { guild, settings: StoredSettings, alert: "Settings successfully saved!" })
})

module.exports = Router