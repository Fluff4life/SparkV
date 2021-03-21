const Discord = require("discord.js");

module.exports = async (bot) => {
  bot.MSToTime = (ms) => {
    let RoundNumber = ms > 0 ? Math.floor : Math.ceil;
    let Days = RoundNumber(ms / 86400000)
    let Hours = RoundNumber(ms / 3600000) % 24
    let Mins = RoundNumber(ms / 60000) % 60
    let Secs = RoundNumber(ms / 1000) % 60

    var time = (Days > 0) ? `${Days} Day${Days === 1 ? "" : "s"}, ` : ""
    time += (Hours > 0) ? `${Hours} Hour${Hours === 1 ? "" : "s"}, ` : ""
    time += (Mins > 0) ? `${Mins} Minute${Mins === 1 ? "" : "s"} & ` : ""
    time += (Secs > 0) ? `${Secs} Seconds.` : "0 Seconds."

    return time
  }

  bot.FormatNumber = (Number) => {
    if (typeof Number === "string") {
      Number = parseInt(Number)
    }

    const DecPlaces = Math.pow(10, 1)
    var Abbrev = ["k", "m", "g", "t", "p", "e"]

    for (var i = Abbrev.length - 1; i >= 0; i--) {
      var Size = Math.pow(10, (i + 1) * 3)

      if (Size <= Number) {
        Number = Math.round((Number * DecPlaces) / Size) / DecPlaces

        if (Number == 1000 && i < Abbrev.length - 1) {
          Number = 1
          i++
        }

        Number += Abbrev[i]
        break
      }
    }

    return Number
  }

  bot.PromptMessage = async (message, author, reactions, seconds) => {
    seconds = seconds * 1000

    for (const Reaction of reactions) {
      await message.react(Reaction)
    }

    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id

    return message
      .awaitReactions(filter, {
        max: 1,
        time: seconds
      })
      .then(collected => collected.first() && collected.first().emoji.name)
  }

  bot.isURL = (string) => {
    if (string.startsWith("discord.gg/") || string.endsWith("discord.gg/")) {
      return true
    }

    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if (regexp.test(string)) {
      return true
    } else {
      return false
    }
  }

  bot.Log = (Status, Type, Details) => {
    const chalk = require("chalk")

    if (Status === "SUCCESS") {
      console.log(chalk.blue(`${Status} - ${Type} => ${Details}`))
    } else if (Status === "ERROR") {
      console.log(chalk.red(`${Status} - ${Type} => ${Details}`))
    } else if (Status === "WARNING") {
      console.log(chalk.yellow(`${Status} - ${Type} => ${Details}`))
    } else if (Status === "DEBUG") {
      console.log(chalk.green(`${Status} - ${Type} => ${Details}`))
    }
  }

  bot.GetUserFromMention = (mention) => {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);

      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }

      return bot.users.cache.get(mention);
    }
  }

  bot.GetServerCount = async () => {
    if (bot.Config.ShardingEnabled === false) {
      return bot.guilds.cache.size
    }

    const promises = [
      bot.shard.fetchClientValues('guilds.cache.size'),
    ];

    return Promise.all(promises).then(results => results.flat().reduce((acc, ServerCount) => acc + ServerCount, 0))
  }

  bot.GetUserCount = async () => {
    if (bot.Config.ShardingEnabled === false) {
      var CollectedUsers = 0

      bot.guilds.cache
        .map((server, id) => CollectedUsers = server.memberCount + CollectedUsers)

      return CollectedUsers
    }

    const promises = [
      bot.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
    ];

    return Promise.all(promises).then(results => results.flat().reduce((acc, MemberCount) => acc + MemberCount, 0))
  }

  bot.Debounce = (callback, wait, immediate) => {
    var timeout

    return function () {
      var context = this, args = arguments
      var later = function () {
        timeout = null
        if (!immediate) callback.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) callback.apply(context, args)
    }
  }

  bot.IsAdmin = (message) => {
    if (message.author.id == Bot.Config.Owner.ID) {
      return true
    } else {
      if (process.env.Admins.includes(message.author.id)) {
        return true
      }

      return false
    }
  }

  bot.wait = (ms) => {
    const Promise = new Promise(r => setTimeout(r, ms))

    return Promise
  }

  bot.FormatDate = (date) => {
    return new Intl
      .DateTimeFormat("en-US")
      .format(date)
  }
}
