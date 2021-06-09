const Discord = require("discord.js")

const passport = require("passport")
const DiscordPassport = require("passport-discord")

const Config = require("../../globalconfig.json")
const MainWebhook = new Discord.WebhookClient("852259324994388039", "FKlZ-IkTZ-e2L-kv3_PwHBKMPzAoAdspQAdAJfeMlbktIarPblgQR3MclamGfK3FT_j9")
global.MainWebhook = MainWebhook

const DiscordStrat = {
    clientID: "848685407189336075",
    clientSecret: "mG176mrsaj92SGbmnMsZVwSm6dTJg7zS",
    callbackURL: `${Config.Debug === true ? "http://localhost:3000" : `https://${process.env.baseURL}`}/api/auth/discord/callback`,
    scope: ["identify", "guilds"],
}

const Auth = (type, token, tokenSecret, profile, done) => {
    if (type === "discord") {
        process.nextTick(async () => {
            done(null, profile)
        })
    }
}

try {
    passport.use(new DiscordPassport.Strategy(DiscordStrat, (token, tokenSecret, profile, done) => Auth("discord", token, tokenSecret, profile, done)))
} catch (err) {
    console.log(`Uh oh! An error occured. ${err}`)
}

passport.serializeUser(async (user, done) => {
    const MainEmbed = new Discord.MessageEmbed()
        .setTitle("User Logged In")
        .setDescription(`**${user.username}${"#" + user.discriminator}** just logged in!`)
        .setFooter(`Ch1ll Notifier | ${user.username}${"#" + user.discriminator}`)
        .setColor("GREEN")

    MainWebhook.send({
      username: "Ch1ll Notifier",
      avatarURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`,
      embeds: [
        MainEmbed
      ]
    })

    done(null, user)
})

passport.deserializeUser((user, done) => done(null, user))