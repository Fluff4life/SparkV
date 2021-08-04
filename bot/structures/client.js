const { Client, Collection, Intents } = require("discord.js");
const Statcord = require("statcord.js");

const fs = require("fs");
const path = require("path");
const util = require("util");

const AntiSpam = require("discord-anti-spam");
const moment = require("moment");

moment.relativeTimeThreshold("s", 60);
moment.relativeTimeThreshold("ss", 5);
moment.relativeTimeThreshold("m", 60);
moment.relativeTimeThreshold("h", 60);
moment.relativeTimeThreshold("d", 24);
moment.relativeTimeThreshold("M", 12);

const botlists = require("../../modules/dependencies/botlists");
const Distube = require("../../modules/dependencies/distubehandler");
const giveawayshandler = require("../../modules/dependencies/giveawayshandler");
const Noblox = require("../../modules/dependencies/noblox");

class bot extends Client {
  constructor(settings) {
    super(settings.bot);

    // Config
    this.config = require("../../globalconfig.json");
    this.languages = require("../languages.json");

    // Utils
    this.logger = require("../../modules/logger");
    this.functions = require("../../modules/functions");
    this.wait = util.promisify(setTimeout);

    // Database
    this.database = require("../../database/handler");

    this.GuildSchema = require("../../database/schemas/guild");
    this.LogSchema = require("../../database/schemas/log");
    this.MemberSchema = require("../../database/schemas/member");
    this.UserSchema = require("../../database/schemas/user");

    // Commands
    this.categories = new Collection();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.events = new Collection();
    this.cooldowns = new Collection();

    return this;
  }

  async LoadModules(settings) {
    const client = this;

    this.functions(this);

    if (process.env.StatCordAPIKey) {
      if (!settings.sharding) {
        const StatClient = new Statcord.Client({
          client,
          key: process.env.StatCordAPIKey,
          postCpuStatistics: true,
          postMemStatistics: true,
          postNetworkStatistics: true,
          autopost: true,
        });

        this.StatClient = StatClient;
      } else if (settings.sharding === true) {
        const StatClient = new Statcord.ShardingClient({
          client,
          key: process.env.StatCordAPIKey,
          postCpuStatistics: true,
          postMemStatistics: true,
          postNetworkStatistics: true,
          autopost: true,
        });

        this.StatClient = StatClient;
      }
    }

    this.AntiSpam = new AntiSpam({
      warnThreshold: 3,
      muteThreshold: 6,
      kickThreshold: 12,
      banThreshold: 24,
      maxInterval: 5500,
      warnMessage: "{@user}, please stop spamming. If you continue to spam, you'll be muted.",
      kickMessage: "**{user_tag}** has been kicked for spamming.",
      muteMessage: "**{user_tag}** has been muted for spamming.",
      banMessage: "**{user_tag}** has been banned for spamming.",
      maxDuplicatesWarning: 5,
      maxDuplicatesKick: 12,
      maxDuplicatesBan: 24,
      exemptPermissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
      ignoreBots: true,
      verbose: true,
      ignoredUsers: [],
      muteRoleName: "Muted",
      removeMessages: true,
    });
  }

  async LoadEvents(MainPath) {
    fs.readdir(path.join(`${MainPath}/events`), (err, files) => {
      if (err) {
        return this.logger(`EVENT LOADING ERROR - ${err}`, "error");
      }

      files.forEach(file => {
        let EventName = file.split(".")[0];
        let FileEvent = require(path.resolve(`${MainPath}/events/${EventName}`));

        this.on(EventName, (...args) => FileEvent.run(this, ...args));
      });
    });
  }

  async LoadCommands(MainPath) {
    fs.readdir(path.join(`${MainPath}/commands`), (err, cats) => {
      if (err) {
        return this.logger(`Commands failed to load! ${err}`, "error");
      }

      cats.forEach(cat => {
        this.categories.set(cat, cat);

        fs.readdir(path.join(`${MainPath}/commands/${cat}`), (err, files) => {
          files.forEach(file => {
            if (!file.endsWith(".js")) {
              return;
            }

            let commandname = file.split(".")[0];
            let FileJs = require(path.resolve(`${MainPath}/commands/${cat}/${commandname}`));

            this.commands.set(commandname, FileJs);
          });
        });
      });
    });
  }
}

module.exports = bot;
