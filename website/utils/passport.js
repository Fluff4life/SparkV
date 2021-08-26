const Discord = require("discord.js");

const fetch = require("node-fetch");
const passport = require("passport");
const DiscordPassport = require("passport-discord");

const Config = require("../../globalconfig.json");

const DiscordStrat = {
  clientID: "848685407189336075",
  clientSecret: "mG176mrsaj92SGbmnMsZVwSm6dTJg7zS",
  callbackURL: `${Config.Debug.Enabled === true ? "http://localhost:3000" : `https://${process.env.BASEURL}`}/api/auth/callback`,
  scope: ["identify", "guilds", "guilds.join"],
};

const Auth = (type, token, tokenSecret, profile, done) => {
  if (type === "discord") {
    process.nextTick(async () => {
      done(null, profile);
    });
  }
};

try {
  passport.use(
    new DiscordPassport.Strategy(DiscordStrat, (token, tokenSecret, profile, done) =>
      Auth("discord", token, tokenSecret, profile, done),
    ),
  );
} catch (err) {
  console.log(`Uh oh! An error occured. ${err}`);
}

passport.serializeUser(async (user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
