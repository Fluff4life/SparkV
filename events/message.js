const Discord = require("discord.js");
const Levels = require("discord-xp")

exports.run = async (Bot, Message) => {
  if (Message.author.bot || !Message.guild) {
    return;
  }

  const AntiURL = await Bot.Database.get(`ServerData_${Message.guild.id}.AntiURL`)

  if (AntiURL && AntiURL === "on" && Bot.isURL(Message.content) && !Message.author.hasPermission("MANAGE_MESSAGES")) {
    try {
      Message.delete();
    } catch (err) {
      Message.channel.send(`${Message.author} sent a url, but I cannot delete it. Please give me permision to delete messages.`).then(m => m.delete({ timeout: 1000 }))
    }

    return Message.reply("you cannot send links here.").then(m => m.delete({ timeout: 1000 }))
  }

  const AntiSpam = await Bot.Database.get(`ServerData_${Message.guild.id}.AntiSpam`)

  if (AntiSpam && AntiSpam === "on" && !Message.channel.name === "spamhere" && !Message.channel.name === "spam-here") {
    Bot.AntiSpam.message(Message)
  }

  const Leveling = await Bot.Database.get(`ServerData_${Message.guild.id}.Leveling`)

  if (Leveling && Leveling === "on") {
    const RandomAmountOfXP = Math.floor(Math.random() * 10) + 5;
    const HasLeveledUp = await Levels.appendXp(Message.author.id, Message.guild.id, RandomAmountOfXP);

    if (HasLeveledUp) {
      const User = await Levels.fetch(Message.author.id, Message.guild.id)

      Message.channel.send(`⚡ Congrats ${Message.author}, you're now at level **${await Bot.FormatNumber(User.level)}**!`)
    }
  }

  const Prefix = await Bot.Database.get(`ServerData_${Message.guild.id}.Prefix`)

  if (Prefix) {
    if (Prefix === Bot.Config.Bot.prefix){
      await Bot.Database.delete(`ServerData_${Message.guild.id}.Prefix`)
    }

    if (Message.content.startsWith(Bot.Config.Bot.prefix)){
      return Message.channel.send(`The prefix for this server is **${Prefix}**!`)
    }

    if (!Message.content.startsWith(Prefix)) {
      return
    }
  } else {
    if (!Message.content.startsWith(Bot.Config.Bot.prefix)) {
      return
    }
  }

  const PrefixLength = () => {
    if (Prefix) {
      return Prefix.length
    } else {
      return Bot.Config.Bot.prefix.length
    }
  }

  const args = Message.content
    .slice(PrefixLength())
    .trim()
    .split(/ +/);

  const command = args.shift().toLowerCase();
  const commandfile = Bot.commands.get(command) || Bot.commands.find(command_ => command_.config.aliases && command_.config.aliases.includes(command));

  if (!commandfile) {
    return
  }

  if (process.env.UserBlacklist.includes(Message.author.id)) {
    try {
      return Message.author.send("Uh oh! Looks like you're banned from using Ch1llBlox. Think this is a mistake? Contact KingCh1ll.").then(() => {
        Message.react("❌")
      })
    } catch {
      Message.react("❌")
    }
  }

  if (commandfile.config.bot_permissions) {
    const BotPermisions = Message.channel.permissionsFor(Message.guild.me)

    if (!BotPermisions || !BotPermisions.has(commandfile.config.bot_permissions)) {
      return Message.channel.send(`❌I don't have permission to do that! Please select my role and allow ${commandfile.config.member_permissions}.`).then(m => m.delete({ timeout: 5000 }))
    }
  }

  if (commandfile.config.member_permissions) {
    const AuthorPermisions = Message.channel.permissionsFor(Message.author)

    if (!AuthorPermisions || !AuthorPermisions.has(commandfile.config.member_permissions)) {
      return Message.channel.send(`❌You don't have permission to do that! You need ${commandfile.config.member_permissions}.`).then(m => m.delete({ timeout: 5000 }))
    }
  }

  if (!commandfile.config.enabled) {
    return Message.reply("This command is currently disabled! Please try again later.")
  }

  if (!Bot.cooldowns.has(commandfile.config.name)) {
    Bot.cooldowns.set(commandfile.config.name, new Discord.Collection());
  }

  const Now = Date.now();
  const Timestamps = Bot.cooldowns.get(commandfile.config.name);
  const CooldownAmount = (commandfile.config.cooldown | 3) * 1000;

  if (Timestamps.has(Message.author.id)) {
    const ExpireTime = Timestamps.get(Message.author.id) + CooldownAmount;

    if (Now < ExpireTime) {
      const TimeLeft = (ExpireTime - Now) / 1000

      return Message.reply({
        embed: {
          title: `Whoa there ${Message.author.username}!`,
          description: `Please wait ${TimeLeft.toFixed(1)} more second(s) to use that command again!`,
          thumbnail: Message.author.avatarURL,
          color: "#0099ff",
          footer: {
            text: "Maybe up vote our bot while you wait?",
            icon_url: Bot.user.AvatarURL
          },
        },
      }
      )
    }
  }

  Timestamps.set(Message.author.id, Now);
  setTimeout(() => Timestamps.delete(Message.author.id), CooldownAmount);

  try {
    await commandfile
      .run(Bot, Message, args, command)
      .then(() => {
        const DeleteUsage = Bot.Database.get(`ServerData_${Message.guild.id}.DeleteUsage`)

        if (DeleteUsage && DeleteUsage === "on") {
          Message.delete().catch(err => { })
        }

        console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\nCOMMAND SUCCESS! \nCommand: ${command}\nArguments: ${args}\nUsername: ${Message.author.tag} ID: ${Message.author.id}`)
      })
  } catch (err) {
    const FailedEmbed = new Discord.MessageEmbed()
      .setTitle("Failed!")
      .setDescription(err)
      .setThumbnail("https://media.discordapp.net/attachments/539579135786352652/641188940983959555/627171202464743434.png")
      .setFooter("Please contact our support team and alert them about this error.", Bot.user.avatarURL)
      .setColor(Bot.Config.Embed.EmbedColor)
      .setTimestamp()

    await Message.channel.send(FailedEmbed)

    console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\n❌FAILED - FAILED to run command! \nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${Message.author.tag}\nError: ${err.toString()}`)
  }
}