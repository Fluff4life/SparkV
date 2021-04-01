const Discord = require("discord.js");
const Levels = require("discord-xp")
const AntiSwearPackage = require("anti-swear-words-packages-discord")

exports.run = async (Bot, message) => {
  if (message.author.bot) {
    return
  }

  if (!message.guild) {
    return;
  }

  const AntiURL = await Bot.dashboard.getVal(message.guild.id, "AntiURL")

  if (AntiURL === true && Bot.isURL(message.content) && !message.author.hasPermission("MANAGE_MESSAGES")) {
    try {
      message.delete();
    } catch (err) {
      message.channel.send(`${message.author} sent a url, but I cannot delete it. Please give me permision to delete messages.`).then(m => m.delete({ timeout: 1000 }))
    }

    return message.reply("you cannot send links here.").then(m => m.delete({ timeout: 1000 }))
  }

  const AntiSwear = await Bot.dashboard.getVal(message.guild.id, "AntiSwear")

  if (AntiSwear === true && !message.author.hasPermission("MANAGE_MESSAGES")) {
    AntiSwearPackage(Bot, message, {
      warnMSG: `🔨 ${message.author}, please stop cursing. If you curse again, you'll be muted.`,
      muteRole: message.guild.roles.cache.find(role => role.name === "Muted"),
      muteCount: 3,
      kickCount: 6,
      banCount: 12
    })
  }

  const AntiSpam = await Bot.dashboard.getVal(message.guild.id, "AntiSpam")

  if (AntiSpam === true && !message.channel.name.endsWith("spamhere") && !message.channel.name.endsWith("spam-here")) {
    Bot.AntiSpam.message(message)
  }

  const Leveling = await Bot.dashboard.getVal(message.guild.id, "Leveling")

  if (Leveling === true) {
    const RandomAmountOfXP = Math.floor(Math.random() * 15) + 10;
    const HasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, RandomAmountOfXP);

    if (HasLeveledUp) {
      const User = await Levels.fetch(message.author.id, message.guild.id)

      message.channel.send(`⚡ Congrats ${message.author}, you're now at level **${await Bot.FormatNumber(User.level)}**!`)
    }
  }

  const ChatBotEnabled = await Bot.dashboard.getVal(message.guild.id, "ChatBotEnabled")
  const Prefix = await Bot.dashboard.getVal(message.guild.id, "Prefix")

  if (ChatBotEnabled === true){
    if (!message.content.startsWith(Prefix)) {
      fetch(`https://api.udit.gq/api/chatbot?message=${encodeURIComponent(message.content)}&gender=male&name=Ch1llBlox`)
        .then((res) => res.json())
        .then((body) => {
          const APIMessage = body.message.replace("CleverChat", "Ch1llBlox")

          return message.reply(APIMessage)
        })
        .catch((err) => {
          console.error(err)

          return message.channel.send("Wha- what? Something went wrong.")
        })
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
      return message.channel.send(`❌I don't have permission to do that! Please select my role and allow ${commandfile.config.member_permissions}.`).then(m => m.delete({ timeout: 5000 }))
    }
  }

  if (commandfile.config.member_permissions) {
    const AuthorPermisions = message.channel.permissionsFor(message.author)

    if (!AuthorPermisions || !AuthorPermisions.has(commandfile.config.member_permissions)) {
      return message.channel.send(`❌You don't have permission to do that! You need ${commandfile.config.member_permissions}.`).then(m => m.delete({ timeout: 5000 }))
    }
  }

  if (!commandfile.config.enabled) {
    return message.reply("This command is currently disabled! Please try again later.")
  }

  if (commandfile.config.category === "🎵music🎵" && await Bot.dashboard.getVal(message.guild.id, "MusicEnabled") === true){
    return message.reply("This command is disabled by the server owner.")
  } else if (commandfile.config.category === "💫leveling💫" && await Bot.dashboard.getVal(message.guild.id, "Leveling") === true){
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
    await commandfile
      .run(Bot, message, args, command)
      .then(async () => {
        const DeleteUsage = await Bot.dashboard.getVal(message.guild.id, "DeleteUsage")

        if (DeleteUsage === true) {
          message.delete().catch((err) => { })
        }

        console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\nCOMMAND SUCCESS! \nCommand: ${command}\nArguments: ${args}\nUsername: ${message.author.tag} ID: ${message.author.id}`)
      })
  } catch (err) {
    message.channel.send("❌ Uh oh! Something went wrong with handling that command. Please try again later.")

    console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\n❌FAILED - FAILED to run command! \nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${message.author.tag}\nError: ${err.toString()}`)
  }
}