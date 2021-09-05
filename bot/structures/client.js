const fs = require("fs");
const path = require("path");
const util = require("util");

const AntiSpam = require("discord-anti-spam");
const { DiscordTogether } = require("discord-together");
const { Client, Collection, Intents, Structures } = require("discord.js");
const Statcord = require("statcord.js");

const botlists = require("../../modules/dependencies/botlists");
const Distube = require("../../modules/dependencies/distubehandler");
const giveawayshandler = require("../../modules/dependencies/giveawayshandler");
const Noblox = require("../../modules/dependencies/noblox");
const updateDocs = require("../../modules/updateDocs");

module.exports = class bot extends Client {
  constructor(settings) {
    super(settings);

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

    // Collections
    this.categories = [];
    this.commands = [];
    this.aliases = new Collection();
    this.events = new Collection();
    this.cooldowns = new Collection();

    return this;
  }

  async LoadModules(settings, MainDir) {
    const client = this;

    // Initialize Functions
    this.functions(this);

    // Update Docs
    updateDocs.update(this, MainDir);
    setInterval(() => updateDocs.update(this, MainDir), 3600 * 1000);

    if (!settings.sharding) {
      const StatClient = new Statcord.Client({
        client,
        key: process.env.STATCORDAPIKEY,
        postCpuStatistics: true,
        postMemStatistics: true,
        postNetworkStatistics: true,
        autopost: true,
      });

      this.StatClient = StatClient;
    } else if (settings.sharding === true) {
      const StatClient = new Statcord.ShardingClient({
        client,
        key: process.env.STATCORDAPIKEY,
        postCpuStatistics: true,
        postMemStatistics: true,
        postNetworkStatistics: true,
        autopost: true,
      });

      this.StatClient = StatClient;
    }

    this.discordTogether = new DiscordTogether(this);

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
        const category = require(path.join(`${MainPath}/commands/${cat}`));
        this.categories.push(category.name);

        fs.readdir(path.join(`${MainPath}/commands/${cat}`), (err, files) => {
          if (err) {
            return this.logger(`Commands failed to load! ${err}`, "error");
          }

          files.forEach(file => {
            if (!file.endsWith(".js")) {
              return;
            }

            let commandname = file.split(".")[0];
            let command = require(path.resolve(`${MainPath}/commands/${cat}/${commandname}`));

            command.category = category.name;
            command.description = category.description;

            if (!this.categories.includes(command.category)) {
              this.categories.push(command.category);
            }

            if (!command || !command.settings || command.config) {
              return;
            }

            command.settings.name = commandname;
            this.commands.push(command);

            if (!command.settings.aliases) {
              return;
            }

            for (const alias of command.settings.aliases) {
              if (!alias) {
                return;
              }

              this.aliases.set(alias, null);
            }
          });
        });
      });
    });
  }
};
