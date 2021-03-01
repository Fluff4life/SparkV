const Discord = require("discord.js");

exports.run = async (Bot, Message) => {
  if (Message.author.Bot) {
    return;
  }

  if (!Message.guild){
    return;
  }

  if (Bot.isURL(Message.content)){
    Message.delete();

    return Message.reply("Whoa there! You cannot send links here.").then(m => m.delete({ timeout: 5000 }))
  }

  const AntiSpam = await Bot.Database.get(`ServerData_${Message.guild.id}.AntiSpam`)
  const AntiSpamMap = Bot.AntiSpamMap

  if (AntiSpam && AntiSpam === "on"){
    const Limit = 5
    const Time = 12
    const Diff = 3

    if (AntiSpamMap.has(Message.author.id)) {
      const UserData = AntiSpamMap.get(Message.author.id)
      const { LastMessage, Timer } = UserData
      var MessageCount = UserData.MessageCount
      const Difference = Message.createdTimestamp - LastMessage.createdTimestamp

      if (Difference > Diff * 1000) {
        clearTimeout(Timer)

        UserData.MessageCount = 1
        UserData.LastMessage = Message
        UserData.LastMessage = Message
        UserData.Timer = setTimeout(() => {
          AntiSpamMap.delete(Message.author.id)
        }, Time * 1000)
        AntiSpamMap.set(Message.author.id, UserData)
      } else {
        ++MessageCount

        if (parseInt(MessageCount) === Limit) {
          Message.delete({ timeout: 5 })
          Message.reply(`please stop spamming! You're now on a cooldown of ${Time} seconds.`).then(m => m.delete({ timeout: 5000 }))
        } else {
          UserData.MessageCount = MessageCount
          AntiSpamMap.set(Message.author.id, UserData)
        }
      }
    } else {
      let Timeout = setTimeout(() => {
        AntiSpamMap.delete(Message.author.id)
      }, Time * 1000)
      AntiSpamMap.set(Message.author.id, {
        MessageCount: 1,
        LastMessage: Message,
        Timer: Timeout
      })
    }
  }

  const Prefix = await Bot.Database.get(`ServerData_${Message.guild.id}.Prefix`)

  if (Prefix) {
    if (!Message.content.startsWith(Prefix)) {
      return
    }
  } else {
    if (!Message.content.startsWith(process.env.prefix)) {
      return
    }
  }

  const PrefixLength = () => {
    if (Prefix) {
      return Prefix.length
    } else {
      return process.env.prefix.length
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

  if (Message.channel.type === "dm") {
    return
  }

  if (process.env.UserBlacklist.includes(Message.author.id)) {
    return
  }

  for (const permission of commandfile.config.bot_permissions) {
    if (!Message.guild.me.hasPermission([permission])) {
      return Message.channel.send(`❌I don't have permission to do that! Please select my role and allow ${permission}.`).then(m => m.delete({ timeout: 5000 }))
    }
  }

  if (!commandfile.config.enabled) {
    return Message.reply("This command is currently disabled! Please try again later.")
  }

  if (!Bot.cooldowns.has(command.name)) {
    Bot.cooldowns.set(command.name, new Discord.Collection());
  }

  const Now = Date.now();
  const Timestamps = Bot.cooldowns.get(command.name);
  const CooldownAmount = (command.cooldown || 3) * 1000;

  if (Timestamps.has(Message.author.id)) {
    const ExpireTime = Timestamps.get(Message.author.id) + CooldownAmount;

    if (Now < ExpireTime) {
      const TimeLeft = (ExpireTime - Now) / 1000;

      return Message.reply({
        embed: {
          title: `Whoa there ${Message.author.username}!`,
          description: `Please wait ${TimeLeft.toFixed(1)} more second(s) to use that command again!`,
          thumbnail: Message.author.avatarURL,
          color: "#0099ff",
          footer: {
            text: "Maybe up vote our bot while you wait?",
            icon_url: process.env.bot_logo
          },
        },
      }
      )
    }
  }

  Timestamps.set(Message.author.id, Now);
  setTimeout(() => Timestamps.delete(Message.author.id), CooldownAmount);

  try {
    commandfile
      .run(Bot, Message, args, command)
      .then(() => { console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\nCOMMAND SUCCESS! \nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${Message.author.tag}`) })
  } catch (err) {
    console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\nFAILED - FAILEd to run command! \nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${Message.author.tag}\nError: ${err}`)
  }
}