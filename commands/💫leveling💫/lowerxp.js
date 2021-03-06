const Discord = require("discord.js");
const Levels = require("discord-xp")

exports.run = async (Bot, message, Arguments) => {
  const Leveling = await Bot.Database.get(`ServerData_${message.guild.id}.Leveling`)

  if (!Leveling || !Leveling === "on") {
    return message.channel.send("Leveling is not enabled for this server. Please enable it by doing `(prefix)Leveling on`!")
  }

  try {
    await Levels.setXp(message.author.id, message.guild.id, Arguments[0]).then(() => {
      message.channel.send(`Successfully lowered xp to ${Arguments[0]}`)
    })
  } catch (err) {
    message.channel.send(`Error lowering xp to ${Arguments[0]}. Please try again later!`)
  }
},

  exports.config = {
    name: "LowerXP",
    description: "Lower XP.",
    aliases: [],
    usage: "<ammount>",
    category: "💫leveling💫",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    member_permissions: ["ADMINISTRATOR"],
    enabled: true,
    cooldown: 2.5
  }