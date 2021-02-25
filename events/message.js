const Discord = require("discord.js");

exports.run = async (Bot, Message) => {
  if (Message.author.Bot) {
    return;
  }

  const AntiSpamMap = new Map()

  const PrefixData = await require("../database/prefix").findOne({
    GuildID: Message.guild.id
  })

  const AntiSpamData = await require("../database/antispam").findOne({
    GuildID: Message.guild.id
  })

  if (AntiSpamData) {
    if (AntiSpamData.Enabled) {
      const { Limit, Time, Diff } = AntiSpamData

      if (AntiSpamMap.has(Message.author.id)) {
        const UserData = AntiSpamMap.get(Message.author.id)
        const { LastMessage, Timer } = UserData
        var MessageCount = UserData.MessageCount
        const Difference = Message.createdTimestamp - LastMessage.createdTimestamp

        if (Difference > Diff) {
          clearTimeout(Timer)

          UserData.MessageCount = 1
          UserData.LastMessage = Message
          UserData.LastMessage = Message
          UserData.Timer = setTimeout(() => {
            AntiSpamMap.delete(message.author.id)
          }, Time)
          AntiSpamMap.set(message.author.id, UserData)
        } else {
          ++MessageCount

          if (parseInt(MessageCount) === Limit) {
            Message.delete()
            Message.channel.send(`${message.author.name}, please stop spamming! You're now on a cooldown of ${Time} secconds.`)
          } else {
            AntUserData.MessageCount = MessageCount
            AntiSpamMap.set(message.author.id, AntUserData)
          }
        }
      } else {
        let Timeout = setTimeout(() => {
          AntiSpamMap.delete(Message.author.id)
        }, Time)
        AntiSpamMap.set(message.author.id, {
          MessageCount: 1,
          LastMessage: Message,
          Timer: Timeout
        })
      }
    }
  } else {
    // Nothing
  }

  if (PrefixData) {
    if (!Message.content.startsWith(PrefixData.Prefix)) {
      return
    }
  } else {
    if (!Message.content.startsWith(process.env.prefix)) {
      return
    }
  }

  const args = Message.content
    .slice(process.env.prefix.length)
    .trim()
    .split(/ +/);

  const command = args.shift().toLowerCase();
  const commandfile = Bot.commands.get(command) || Bot.commands.find(command_ => command_.config.aliases && command_.config.aliases.includes(command));

  if (!commandfile) {
    return
  }

  if (process.env.UserBlacklist.includes(Message.author.id)) {
    return
  }

  if (Message.channel.type === "dm") {
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
      .then(() => { console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\nSucessfully ran command! \nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${Message.author.tag}\n\`\`\`\`\`\`\`\`\`\`\`\`\``) })
  } catch {
    console.log(`Failed running command! \nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${Message.author.tag}`)
  }
}