const passport = require("passport")
const DiscordPassport = require("passport-discord")

const Config = require("../../globalconfig.json")

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
    try {
        if (await global.Database.get(`WebsiteData.Users.${user.id}`)) {
            console.log(user.id)
        } else {
            await global.Database.set(`WebsiteData.Users.${user.id}`, {
                username: user.username,
                tag: user.discriminator,
                userid: user.id,
                avatarid: user.avatar
            })
        }

        done(null, user)
    } catch (err) {
        done(err, user)
    }
})

passport.deserializeUser((obj, done) => done(null, obj));