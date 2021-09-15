const Discord = require("discord.js");

const Invitergx =
  /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite|discord.com\/invite)\/+[a-zA-Z0-9]{6,16}/g;
const URLrgx = /(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;

let bot;

module.exports = {
  /**
   * Initilizes functions.
   * @param {Object} client Discord client.
   */
  init(client) {
    if (!client) {
      throw new TypeError("Discord client must be valid.");
    }

    bot = client;
  },

  /**
   *
   * @param {Object} message Message object.
   * @param {Object} data Guild's data souced from the guild data collection using mongoose.
   * @returns {string} Prefix.
   */
  getPrefix(message, data) {
    const acceptedPrefixes = [
      `<@!${message.client.user.id}> `,
      `<@${message.client.user.id}> `,
      bot.config.Debug.Enabled === true ? "_" : data.guild.settings.prefix,
    ];

    let prefix;

    acceptedPrefixes.forEach(p => {
      if (message.content.toLowerCase().startsWith(p)) {
        prefix = p;
      } else {
        prefix = null;
      }
    });

    return prefix;
  },

  /**
   *
   * @param {number} Number The number to format.
   * @returns {string} The formatted number.
   */
  FormatNumber(Number) {
    if (typeof Number === "string") {
      Number = parseInt(Number);
    }

    const DecPlaces = Math.pow(10, 1);
    let Abbrev = ["k", "m", "g", "t", "p", "e"];

    for (let i = Abbrev.length - 1; i >= 0; i--) {
      let Size = Math.pow(10, (i + 1) * 3);

      if (Size <= Number) {
        Number = Math.round((Number * DecPlaces) / Size) / DecPlaces;

        if (Number === 1000 && i < Abbrev.length - 1) {
          Number = 1;
          i++;
        }

        Number += Abbrev[i];
        break;
      }
    }

    return Number;
  },

  /**
   *
   * @param {number} ms The ms to convert to a time.
   * @returns {string} The time.
   */
  MSToTime(ms) {
    let RoundNumber = ms > 0 ? Math.floor : Math.ceil;
    let Days = RoundNumber(ms / 86400000);
    let Hours = RoundNumber(ms / 3600000) % 24;
    let Mins = RoundNumber(ms / 60000) % 60;
    let Secs = RoundNumber(ms / 1000) % 60;

    let time = Days > 0 ? `${Days} Day${Days === 1 ? "" : "s"}, ` : "";
    time += Hours > 0 ? `${Hours} Hour${Hours === 1 ? "" : "s"}, ` : "";
    time += Mins > 0 ? `${Mins} Minute${Mins === 1 ? "" : "s"} & ` : "";
    time += Secs > 0 ? `${Secs} Second${Secs === 1 ? "" : "s"}.` : "0 Seconds.";

    return time;
  },

  /*
  Old.
  async PromptMessage(message, author, reactions, seconds) {
    seconds *= 1000

    for (const Reaction of reactions) {
      await message.react(Reaction)
    }

    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id

    setTimeout(() => {
      if (message.deleted) {
        return
      }

      message.reactions.removeAll()

      return false
    }, seconds)

    return message
      .awaitReactions(filter, {
        max: 1,
        time: seconds
      })
      .then(collected => collected.first() && collected.first().emoji.name)
  },
  */

  /**
   *
   * @param {Object} message Discord message.
   * @param {Object} args Arguments.
   * @returns {Object} Member. If the member is not found, the value will be null.
   */
  async GetMember(message, args) {
    let member = message.mentions.members.first();
    let checkCache = bot.users.cache.get(args.slice(0).join(" "));
    let checkCache2 = bot.users.cache.get(args[0]);
    let checkGuildCache = message.guild.members.cache.find(
      u => u.user.username.toLowerCase() === args.slice(0).join(" ") || u.user.username === args[0],
    );

    if (message.mentions.members.first()) {
      member = message.mentions.members.first();
    } else if (message.guild.members.cache.get(args[0])) {
      member = message.guild.members.cache.get(args[0]);
    } else if (checkCache) {
      member = checkCache;
    } else if (checkGuildCache) {
      member = checkGuildCache;
    } else if (checkCache2) {
      member = checkCache2;
    } else {
      member = null;
    }

    return member;
  },

  // Plugins //

  /**
   *
   * @param {string} String The string to check for a URL.
   * @returns {boolean}
   */
  isURL(String) {
    if (URLrgx.test(String)) {
      return true;
    }

    if (URLrgx.test(String)) {
      return true;
    }

    return false;
  },

  /**
   *
   * @param {string} mention The mention
   * @returns {Object} The user object found. If not found, it will be null.
   */
  async GetUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);

      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      return bot.users.cache.get(mention);
    }
  },

  /**
   * Get's all of the bot's guilds and counts them up.
   * @returns {string} Server count
   */
  async GetServerCount() {
    if (bot.config.bot.Sharding.ShardingEnabled === false) {
      return bot.guilds.cache.size;
    }

    const promises = [bot.shard.fetchClientValues("guilds.cache.size")];

    return Promise.all(promises).then(results => results.flat().reduce((acc, ServerCount) => acc + ServerCount, 0));
  },

  /**
   * Get's all of the bot's guilds and counts the user count.
   * @returns {string} User count
   */
  async GetUserCount() {
    if (bot.config.bot.Sharding.ShardingEnabled === false) {
      let CollectedUsers = 0;

      bot.guilds.cache.map((server, id) => (CollectedUsers = server.memberCount + CollectedUsers));

      return CollectedUsers;
    }
  },

  /*
  Async Debounce(callback, wait, immediate) {
    let timeout

    return function() {
      let context = this,
        args = args
      let later = function() {
        timeout = null
        if (!immediate) callback.apply(context, args)
      }
      let callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) callback.apply(context, args)
    },
  },
  */

  /**
   *
   * @param {string} ms The amount of ms to wait for.
   * @returns {promise} Sets timeout.
   */
  async wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  },

  /**
   *
   * @param {Date} date The date.
   * @returns {string} Formatted date.
   */
  async FormatDate(date) {
    return new Intl.DateTimeFormat("en-US").format(date);
  },
};
