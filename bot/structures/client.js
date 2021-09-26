const fs = require("fs");
const path = require("path");
const util = require("util");

const AntiSpam = require("discord-anti-spam");
const { DiscordTogether } = require("discord-together");
const { Client, Collection, Intents, Structures } = require("discord.js");
const Statcord = require("statcord.js");

const Distube = require("../../modules/dependencies/distubehandler");
const giveawayshandler = require("../../modules/dependencies/giveawayshandler");
const Noblox = require("../../modules/dependencies/noblox");
const updateDocs = require("../../modules/updateDocs");

const GuildSchema = require("../../database/schemas/guild");
const MemberSchema = require("../../database/schemas/member");
const UserSchema = require("../../database/schemas/user");

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
    this.MemberSchema = require("../../database/schemas/member");
    this.UserSchema = require("../../database/schemas/user");

    // Collections
    this.categories = new Collection();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.events = new Collection();
    this.cooldowns = new Collection();

    // Database Cache
    this.dbCache = {};
    this.dbCache.guilds = new Collection();
    this.dbCache.members = new Collection();
    this.dbCache.users = new Collection();

    // Start functions
    require("../../modules/functions").init(this);

    return this;
  }

  async LoadModules(settings, MainDir) {
    const client = this;

    // Function
    const createRedis = () =>
      new Promise(resolve => {
        const rClient = require("redis").createClient({
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        });
        rClient.auth(process.env.REDIS_PASSWORD);

        for (const prop in rClient) {
          if (typeof rClient[prop] === "function") {
            rClient[`${prop}Async`] = util.promisify(rClient[prop]).bind(rClient);
          }
        }

        rClient.on("error", err => console.error(err));
        rClient.on("ready", resolve.bind(null, rClient));
      });

    // Update Docs
    setTimeout(() => updateDocs.update(this, MainDir), 10 * 1000);

    // Cache
    this.redis = await createRedis();

    // Functions
    this.database.init(this);
    Distube(this);
    giveawayshandler(this);
    Noblox(this);

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
    const events = fs.readdirSync(path.join(`${MainPath}/events`)).filter(file => file.endsWith(".js"));

    for (const eventF of events) {
      const event = require(path.resolve(`${MainPath}/events/${eventF}`));

      if (event.once) {
        this.once(eventF.split(".")[0], (...args) => event.execute(this, ...args));
      } else {
        this.on(eventF.split(".")[0], (...args) => event.execute(this, ...args));
      }
    }
  }

  async LoadCommands(MainPath) {
    fs.readdir(path.join(`${MainPath}/commands`), (err, cats) => {
      if (err) {
        return this.logger(`Commands failed to load! ${err}`, "error");
      }

      cats.forEach(cat => {
        const category = require(path.join(`${MainPath}/commands/${cat}`));
        this.categories.set(category.name, category);

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

            if (!command || !command.settings || command.config) {
              return;
            }

            command.category = category.name;
            command.description = category.description;

            if (!this.categories.has(command.category)) {
              this.categories.set(command.category, category);
            }

            command.settings.name = commandname;
            this.commands.set(commandname, command);

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
