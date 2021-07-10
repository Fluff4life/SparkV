const Discord = require(`discord.js`)
const Levels = require(`discord-xp`)
const fetch = require(`node-fetch`)
const AntiSwearPackage = require(`anti-swear-words-packages-discord`)
const { configureScope } = require(`@sentry/node`)
const afk = require("../../models/afk")

exports.run = async (Bot, message) => {
  if (message.channel.type === `dm` || !message.channel.viewable || message.author.bot) {
    return
  }

  // User //
  const UserMentioned = message.mentions.members.first()
  const user = message.guild.members.cache.get(message.author.id)

  // AFK //
  const Authordata = await afk.findOne({
    UserID: message.author.id
  })

  if (Authordata) {
    message.lineReply(Bot.Config.Bot.Responses.AFKWelcomeMessage)

    Authordata.deleteOne({
      UserID: message.author.id
    })
  }

  if (UserMentioned) {
    const data = await afk.findOne({
      UserID: UserMentioned.id
    })

    if (data) {
      message.lineReply(Bot.Config.Bot.Responses.AFKMessage.toString().replaceAll(`{userMentioned}`, UserMentioned.user.username).replaceAll(`{reason}`, data.Reason))
    }
  }

  const AntiURL = await Bot.dashboard.getVal(message.guild.id, `removelinks`)

  if (!AntiURL === `Disabled`) {
    if (!user.hasPermission(`MANAGE_MESSAGES`) && Bot.isURL(message.content)) {
      if (AntiURL === `Enabled`) {
        try {
          message.delete()
        } catch (err) {
          message
            .lineReplyNoMention(Bot.Config.Bot.Responses.InvalidPermisions.Bot.toString().replaceAll(`{author}`, message.author))
            .then((m) => m.delete({ timeout: 1000 }))
        }
      }
    }

    return message.channel
      .send(`🔨 ${message.author}, you cannot send links here!`)
      .then((m) => m.delete({ timeout: 1000 }))
  }

  const AntiSwear = await Bot.dashboard.getVal(message.guild.id, `removebadwords`)

  if (AntiSwear === `Enabled`) {
    if (!user.hasPermission(`MANAGE_MESSAGES`)) {
      AntiSwearPackage(Bot, message, {
        warnMSG: `🔨 ${message.author}, please stop cursing. If you curse again, you'll be muted.`,
        muteRole: `Muted`,
        ignoreWord: [`hello`],
        muteCount: 3,
        kickCount: 6,
        banCount: 12,
      })
    }
  }

  const AntiSpam = await Bot.dashboard.getVal(message.guild.id, `removerepeatedtext`)

  if (AntiSpam === `Enabled`) {
    if (!message.channel.name.startsWith(`spam`) && !message.channel.name.endsWith(`spam`)) {
      Bot.AntiSpam.message(message)
    }
  }

  const Leveling = await Bot.dashboard.getVal(message.guild.id, `leveling`)

  if (Leveling === `Enabled`) {
    let MaxXP = await Bot.dashboard.getVal(message.guild.id, `leveling_maxxp`)
    let MinXP = await Bot.dashboard.getVal(message.guild.id, `leveling_minxp`)

    if (isNaN(MaxXP)) {
      MaxXP = 25
    }

    if (isNaN(MinXP)) {
      MinXP = 5
    }

    const RandomXP = Math.floor(Math.random() * MaxXP || 25) + MinXP || 5
    const HasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, RandomXP)

    if (HasLeveledUp) {
      const User = await Levels.fetch(message.author.id, message.guild.id)
      const Level = await Bot.FormatNumber(User.level)

      message.lineReplyNoMention(Bot.Config.Bot.Responses.LevelUpMessage.toString().replaceAll(`{author}`, message.author).replaceAll(`{level}`, Level))
    }
  }

  const Prefix = await Bot.dashboard.getVal(message.guild.id, `Prefix`)
  const ChatBot = await Bot.dashboard.getVal(message.guild.id, `ChatBot`)

  if (!message.content.startsWith(Prefix)) {
    if (ChatBot.toLowerCase() === `message`) {
      return ActivateChatBot(message)
    }
  }

  if (message.mentions.has(Bot.user)) {
    const args = message.content.slice(Bot.user.id.length + 4).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    const commandfile = Bot.commands.get(command) || Bot.commands.find(command_ => command_.config.aliases && command_.config.aliases.includes(command))
    if (commandfile) {
      return HandleCommand(Bot, message, args, command, commandfile)
    } else {
      const ChatBot = await Bot.dashboard.getVal(message.guild.id, `ChatBot`)

      if (ChatBot.toLowerCase() === `mention` && message.channel.type === "text") {
        return ActivateChatBot(message)
      }
    }
  } else {
    const Prefix = await Bot.dashboard.getVal(message.guild.id, `Prefix`)
    const ChatBot = await Bot.dashboard.getVal(message.guild.id, `ChatBot`)

    if (!message.content.startsWith(Prefix) && ChatBot.toLowerCase() === `message`) {
      return ActivateChatBot(message)
    }

    if (!message.content.startsWith(Prefix)) {
      return
    }

    const args = message.content.slice(Prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    const commandfile = Bot.commands.get(command) || Bot.commands.find((command_) => command_.config.aliases && command_.config.aliases.includes(command))

    return HandleCommand(Bot, message, args, command, commandfile)
  }
}

async function HandleCommand(Bot, message, args, command, commandfile) {
  if (!commandfile) {
    return
  }

  if (process.env.UserBlacklist.includes(message.author.id)) {
    try {
      return message.author
        .send(`${Bot.Config.Bot.Emojis.Error} | Uh oh! Looks like you're banned from using Ch1llBlox.`)
        .then(() => {
          message.react(Bot.Config.Bot.Emojis.Error)
        })
    } catch {
      message.react(Bot.Config.Bot.Emojis.Error)
    }
  }

  if (commandfile.config.bot_permissions) {
    const BotPermisions = message.channel.permissionsFor(Bot.user)

    if (!BotPermisions || !BotPermisions.has(commandfile.config.bot_permissions)) {
      return message.lineReply(Bot.Config.Bot.Responses.Bot.toString().replaceAll(`{permission}`, commandfile.config.member_permissions))
    }
  }

  if (commandfile.config.member_permissions) {
    const AuthorPermisions = message.channel.permissionsFor(message.author)

    if (!AuthorPermisions || !AuthorPermisions.has(commandfile.config.member_permissions)) {
      return message.lineReply(Bot.Config.Bot.Responses.Bot.toString().replaceAll(`{permission}`, commandfile.config.member_permissions))
    }
  }

  if (!commandfile.config.enabled) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | This command is currently disabled! Please try again later.`)
  }

  const MusicEnabled = await Bot.dashboard.getVal(message.guild.id, `MusicEnabled`)
  const Leveling = await Bot.dashboard.getVal(message.guild.id, `leveling`)

  if (commandfile.config.category === `🎵music🎵` && MusicEnabled === `Disabled`) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | This command is disabled by the server owner. Please visit my dashboard and enable leveling.`)
  } else if (commandfile.config.category === `💫leveling💫` && Leveling === `Disabled`) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | This command is disabled by the server owner. Please visit my dashboard and enable leveling.`)
  }

  if (!Bot.cooldowns.has(commandfile.config.name)) {
    Bot.cooldowns.set(commandfile.config.name, new Discord.Collection())
  }

  const Now = Date.now()
  const Timestamps = Bot.cooldowns.get(commandfile.config.name)
  const CooldownAmount = Math.round(commandfile.config.cooldown | (3 * 1000))

  if (Timestamps.has(message.author.id)) {
    const ExpireTime = Math.round(Timestamps.get(message.author.id) + CooldownAmount)

    if (Now < ExpireTime) {
      const TimeLeft = Math.round((ExpireTime - Now) / 1000)

      return message.lineReply({
        embed: {
          title: `${Bot.Config.Bot.Emojis.error} | Whoa there ${message.author.username}!`,
          description: `Please wait ${TimeLeft} more seconds to use that command again.`,
          thumbnail: message.author.avatarURL,
          color: `#0099ff`,
          footer: {
            text: Bot.Config.Bot.Embed.Footer,
            icon_url: Bot.user.displayAvatarURL(),
          },
        },
      })
    }
  }

  Timestamps.set(message.author.id, Now)
  setTimeout(() => Timestamps.delete(message.author.id), CooldownAmount)

  try {
    if (Bot.StatClient) {
      Bot.StatClient.postCommand(commandfile.config.name, message.author.id)
    }

    await commandfile.run(Bot, message, args, command).then(async () => {
      const DeleteUsage = await Bot.dashboard.getVal(message.guild.id, `deletecommandusage`)

      if (DeleteUsage === `Enabled`) {
        message.delete().catch(() => { })
      }
    })
  } catch (err) {
    const AnnonymousUser = `Annonymous`

    configureScope((scope) => {
      scope.setUser({
        AnnonymousUser,
      })

      scope.setTag(`Command`, commandfile.config.name)
      scope.setTag(`CurrentPing`, Bot.ws.ping)
      scope.setTag(`GuildType`, message.channel.type)
    })

    message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.error} | Uh oh! Something went wrong with handling that command. If this happends again, please join my Support Server (^Invite) and report this error. Sorry!`)
  }
}

async function ActivateChatBot(message) {
  message.channel.startTyping()

  try {
    await fetch(`http://api.brainshop.ai/get?bid=${encodeURIComponent(process.env.chat_bid)}&key=${encodeURIComponent(process.env.chat_key)}&uid=${encodeURIComponent(message.author.id)}&msg=${encodeURIComponent(message.cleanContent)}`).then((res) => {
      const data = res.data
      const botmsg = data.cnt

      if (botmsg) {
        if (message.deleted) {
          return
        }

        const APIEmbed = new Discord.MessageEmbed()
          .setTitle(`Ch1llBlox`)
          .setDescription(botmsg)
          .setFooter(`Never send personal information to Ch1llBlox. • ${Bot.Config.Bot.Embed.Footer}`, Bot.user.displayAvatarURL())
          .setColor(Bot.Config.Bot.Embed.Color)

        if (Bot.StatClient) {
          Bot.StatClient.postCommand(`ChatBot`, message.author.id)
        }

        message.lineReplyNoMention(APIEmbed)
      } else {
        console.error(err)

        return message.lineReply(`${Bot.Config.Bot.Emojis.error} | Wha- what? Something went wrong.`)
      }
    })
  } catch (err) {
    console.error(err)

    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | Wha- what? Something went wrong.`)
  }

  message.channel.stopTyping()
}
