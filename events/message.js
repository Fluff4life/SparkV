const Discord = require("discord.js");
const Levels = require("discord-xp")
const fetch = require("node-fetch")
const AntiSwearPackage = require("anti-swear-words-packages-discord")
const { configureScope } = require("@sentry/node")

exports.run = async (Bot, message) => {
  if (message.author.bot) {
    return
  }

  if (!message.guild) {
    return
  }

  const user = message.guild.members.cache.get(message.author.id);
  const AntiURL = await Bot.dashboard.getVal(message.guild.id, "removelinks")

  if (!AntiURL === "Disabled") {
    if (!user.hasPermission("MANAGE_MESSAGES") && Bot.isURL(message.content)){
      if (AntiURL === "Enabled"){
        try {
          message.delete();
        } catch (err) {
          message.lineReplyNoMention(`${message.author} sent a url, but I cannot delete it. Please give me permision to delete messages.`).then(m => m.delete({ timeout: 1000 }))
        }
      }
    }
    
    return message.channel.send(`🔨 ${message.author}, you cannot send links here!`).then(m => m.delete({ timeout: 1000 }))
  }

  const AntiSwear = await Bot.dashboard.getVal(message.guild.id, "removebadwords")

  if (AntiSwear === "Enabled"){
    if (!user.hasPermission("MANAGE_MESSAGES")) {
      AntiSwearPackage(Bot, message, {
        warnMSG: `🔨 ${message.author}, please stop cursing. If you curse again, you'll be muted.`,
        muteRole: "Muted",
        ignoreWord: ["hello"],
        muteCount: 3,
        kickCount: 6,
        banCount: 12
      })
    }
  }

  const AntiSpam = await Bot.dashboard.getVal(message.guild.id, "removerepeatedtext")

  if (AntiSpam === "Enabled"){
    if (!message.channel.name.startsWith("spam") && !message.channel.name.endsWith("spam")){
      Bot.AntiSpam.message(message)
    }
  }

  const Leveling = await Bot.dashboard.getVal(message.guild.id, "leveling")

  if (Leveling === "Enabled") {
    let MaxXP = await Bot.dashboard.getVal(message.guild.id, "leveling_maxxp")
    let MinXP = await Bot.dashboard.getVal(message.guild.id, "leveling_minxp")

    if (isNaN(MaxXP)){
      MaxXP = 15
    }

    if (isNaN(MinXP)){
      MinXP = 10
    }

    const RandomXP = Math.floor(Math.random() * MaxXP || 15) + MinXP || 10;
    const HasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, RandomXP);

    if (HasLeveledUp) {
      const User = await Levels.fetch(message.author.id, message.guild.id)

      message.lineReplyNoMention(`⚡ Congrats ${message.author}, you're now at level **${await Bot.FormatNumber(User.level)}**!`)
    }
  }

  const ChatBot = await Bot.dashboard.getVal(message.guild.id, "ChatBot")
  const Prefix = await Bot.dashboard.getVal(message.guild.id, "Prefix")

  if (!message.content.startsWith(Prefix)) {
    const ActivateChatBot = () => {
      var CleanedMessage = Discord.Util.cleanContent(message.content, message)

      fetch(`https://api.udit.gq/api/chatbot?message=${encodeURIComponent(CleanedMessage)}&gender=male&name=Ch1llBlox`)
        .then((res) => res.json())
        .then((body) => {
          if (message.deleted){
            return
          }

          const APIMessage = body.message.replace("CleverChat", "Ch1llBlox")

          message.lineReplyNoMention(APIMessage)
        })
        .catch((err) => {
          console.error(err)

          return message.lineReplyNoMention("Wha- what? Something went wrong.")
        })
    }

    if (ChatBot.toLowerCase() === "mention" && message.mentions.has(Bot.user)){
      ActivateChatBot()
    } else if (ChatBot.toLowerCase() === "message") {
      ActivateChatBot()
    }
  }

  if (!message.content.startsWith(Prefix)) {
    return
  }

  const args = message.content
    .slice(Prefix.length)
    .trim()
    .split(/ +/);

  const command = args.shift().toLowerCase();
  const commandfile = Bot.commands.get(command) || Bot.commands.find(command_ => command_.config.aliases && command_.config.aliases.includes(command));

  if (!commandfile) {
    return
  }

  if (process.env.UserBlacklist.includes(message.author.id)) {
    try {
      return message.author.send("❗ Uh oh! Looks like you're banned from using Ch1llBlox. Think this is a mistake? You may appeal [here](appealformtodo).").then(() => {
        message.react("❌")
      })
    } catch {
      message.react("❌")
    }
  }

  if (commandfile.config.bot_permissions) {
    const BotPermisions = message.channel.permissionsFor(message.guild.me)

    if (!BotPermisions || !BotPermisions.has(commandfile.config.bot_permissions)) {
      return message.lineReplyNoMention(`❌I don't have permission to do that! Please select my role and allow ${commandfile.config.member_permissions}.`)
    }
  }

  if (commandfile.config.member_permissions) {
    const AuthorPermisions = message.channel.permissionsFor(message.author)

    if (!AuthorPermisions || !AuthorPermisions.has(commandfile.config.member_permissions)) {
      return message.lineReplyNoMention(`❌You don't have permission to do that! You need ${commandfile.config.member_permissions}.`)
    }
  }

  if (!commandfile.config.enabled) {
    return message.reply("This command is currently disabled! Please try again later.")
  }

  if (commandfile.config.category === "🎵music🎵" && await Bot.dashboard.getVal(message.guild.id, "MusicEnabled") === "false") {
    return message.reply("This command is disabled by the server owner.")
  } else if (commandfile.config.category === "💫leveling💫" && await Bot.dashboard.getVal(message.guild.id, "Leveling") === "false") {
    return message.reply("This command is disabled by the server owner.")
  }

  if (!Bot.cooldowns.has(commandfile.config.name)) {
    Bot.cooldowns.set(commandfile.config.name, new Discord.Collection());
  }

  const Now = Date.now();
  const Timestamps = Bot.cooldowns.get(commandfile.config.name);
  const CooldownAmount = Math.round(commandfile.config.cooldown | 3 * 1000)

  if (Timestamps.has(message.author.id)) {
    const ExpireTime = Math.round(Timestamps.get(message.author.id) + CooldownAmount)

    if (Now < ExpireTime) {
      const TimeLeft = Math.round((ExpireTime - Now) / 1000)

      return message.reply({
        embed: {
          title: `Whoa there ${message.author.username}!`,
          description: `Please wait ${TimeLeft} more seconds to use that command again!`,
          thumbnail: message.author.avatarURL,
          color: "#0099ff",
          footer: {
            text: "Maybe up vote our Bot while you wait?",
            icon_url: Bot.user.displayAvatarURL()
          },
        },
      }
      )
    }
  }

  Timestamps.set(message.author.id, Now);
  setTimeout(() => Timestamps.delete(message.author.id), CooldownAmount);

  try {
    const { username, discriminator, id } = message.author

    configureScope(scope => {
      scope.setUser({
        username,
        discriminator,
        id
      })

      scope.setTag("command", commandfile.config.name)
      scope.setTag("guild", message.channel.guild.id || "DM")
    })

    await commandfile
      .run(Bot, message, args, command)
      .then(async () => {
        const DeleteUsage = await Bot.dashboard.getVal(message.guild.id, "deletecommandusage")

        if (DeleteUsage === "Enabled") {
          message.delete().catch((err) => { })
        }

        console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\nCOMMAND SUCCESS! \nCommand: ${command}\nArguments: ${args}\nUsername: ${message.author.tag} ID: ${message.author.id}`)
      })
  } catch (err) {
    console.error(`\`\`\`\`\`\`\`\`\`\`\`\`\`\n❌FAILED - FAILED to run command! \nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${message.author.tag}\nError: ${err.toString()}`)
    message.lineReplyNoMention("❌ Uh oh! Something went wrong with handling that command. If this happends again, please join my Support Server (^Invite) and report this error. Sorry!")
  }
}