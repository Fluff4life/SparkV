const Discord = require("discord.js");
const Levels = require("discord-xp")

exports.run = async (Bot, message) => {
  if (message.author.bot || !message.guild) {
    return;
  }

  const AntiURL = await Bot.Database.get(`ServerData_${message.guild.id}.AntiURL`)

  if (AntiURL && AntiURL === "on" && Bot.isURL(message.content) && !message.author.hasPermission("MANAGE_MESSAGES")) {
    try {
      message.delete();
    } catch (err) {
      message.channel.send(`${message.author} sent a url, but I cannot delete it. Please give me permision to delete messages.`).then(m => m.delete({ timeout: 1000 }))
    }

    return message.reply("you cannot send links here.").then(m => m.delete({ timeout: 1000 }))
  }

  const AntiSpam = await Bot.Database.get(`ServerData_${message.guild.id}.AntiSpam`)

  if (AntiSpam && AntiSpam === "on" && !message.channel.name === "spamhere" && !message.channel.name === "spam-here") {
    Bot.AntiSpam.message(message)
  }

  const Leveling = await Bot.Database.get(`ServerData_${message.guild.id}.Leveling`)

  if (Leveling && Leveling === "on") {
    const RandomAmountOfXP = Math.floor(Math.random() * 10) + 5;
    const HasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, RandomAmountOfXP);

    if (HasLeveledUp) {
      const User = await Levels.fetch(message.author.id, message.guild.id)

      message.channel.send(`⚡ Congrats ${message.author}, you're now at level **${await Bot.FormatNumber(User.level)}**!`)
    }
  }

  const Prefix = await Bot.Database.get(`ServerData_${message.guild.id}.Prefix`)

  if (Prefix) {
    if (Prefix === Bot.Config.Bot.prefix){
      await Bot.Database.delete(`ServerData_${message.guild.id}.Prefix`)
    } else {
      if (message.content.startsWith(Bot.Config.Bot.prefix)){
        return message.channel.send(`The prefix for this server is **${Prefix}**!`)
      }
    }

    if (!message.content.startsWith(Prefix)) {
      return
    }
  } else {
    if (!message.content.startsWith(Bot.Config.Bot.prefix)) {
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

  const args = message.content
    .slice(PrefixLength())
    .trim()
    .split(/ +/);

  const command = args.shift().toLowerCase();
  const commandfile = Bot.commands.get(command) || Bot.commands.find(command_ => command_.config.aliases && command_.config.aliases.includes(command));

  if (!commandfile) {
    return
  }

  if (process.env.UserBlacklist.includes(message.author.id)) {
    try {
      return message.author.send("Uh oh! Looks like you're banned from using Ch1llBlox. Think this is a mistake? Contact KingCh1ll.").then(() => {
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

  if (!Bot.cooldowns.has(commandfile.config.name)) {
    Bot.cooldowns.set(commandfile.config.name, new Discord.Collection());
  }

  const Now = Date.now();
  const Timestamps = Bot.cooldowns.get(commandfile.config.name);
  const CooldownAmount = (commandfile.config.cooldown | 3) * 1000;

  if (Timestamps.has(message.author.id)) {
    const ExpireTime = Timestamps.get(message.author.id) + CooldownAmount;

    if (Now < ExpireTime) {
      const TimeLeft = (ExpireTime - Now) / 1000

      return message.reply({
        embed: {
          title: `Whoa there ${message.author.username}!`,
          description: `Please wait ${TimeLeft.toFixed(1)} more second(s) to use that command again!`,
          thumbnail: message.author.avatarURL,
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

  Timestamps.set(message.author.id, Now);
  setTimeout(() => Timestamps.delete(message.author.id), CooldownAmount);

  try {
    await commandfile
      .run(Bot, message, args, command)
      .then(async () => {
        const DeleteUsage = await Bot.Database.get(`ServerData_${message.guild.id}.DeleteUsage`)

        if (DeleteUsage && DeleteUsage === "on") {
          message.delete().catch((err) => { console.log(err) })
        }

        console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\nCOMMAND SUCCESS! \nCommand: ${command}\nArguments: ${args}\nUsername: ${message.author.tag} ID: ${message.author.id}`)
      })
  } catch (err) {
    err = err.toString()

    const clean = (err) => {
      if (err.includes(process.env.token)){
        err = err.replace(process.env.token, "BOT_TOKEN")
      }
  
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }
  
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }
  
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }
  
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }

        
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }
  
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }
  
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }
  
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }

        
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }
  
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }
  
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }
  
      if (err.includes("Jake&Ryan")){
        err = err.replace("Jake&Ryan", "USER")
      }

      return err
    }

    const FailedEmbed = new Discord.MessageEmbed()
      .setTitle("**Failed!**")
      .setDescription(clean(err))
      .setThumbnail("https://media.discordapp.net/attachments/539579135786352652/641188940983959555/627171202464743434.png")
      .setFooter("Please contact our support team and alert them about this error.", Bot.user.avatarURL)
      .setColor(Bot.Config.Embed.EmbedColor)
      .setTimestamp()

    await message.channel.send(FailedEmbed)

    console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\n❌FAILED - FAILED to run command! \nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${message.author.tag}\nError: ${err.toString()}`)
  }
}