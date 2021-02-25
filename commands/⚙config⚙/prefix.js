const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const Data = await require("../../database/prefix").findOne({
    GuildID: message.guild.id,
  })

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("You don't have permision to run this command!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!Arguments[0]) {
    return message.channel.send("What do I change the prefix to??").then(m => m.delete({ timeout: 5000 }))
  }

  if (Arguments[0].lenth > 5) {
    return message.channel.send("Your new prefix must be under 5 characters.").then(m => m.delete({ timeout: 5000 }))
  }

  if (Data) {
    await require("../../database/prefix").findOneAndRemove({
      GuildID: message.guild.id,
    })

    let newData = new require("../../database/prefix")({
      GuildName: message.guild.name,
      GuildID: message.guild.id,

      Prefix: Arguments[0],
    })

    newData.save()
    message.channel.send(`The server's new prefix is now **${Arguments[0]}**`).then(m => m.delete({ timeout: 5000 }))
  } else if (!Data) {
    let newData = new require("../../database/prefix")({
      GuildName: message.guild.name,
      GuildID: message.guild.id,
      
      Prefix: Arguments[0],
    })

    newData.save()

    message.channel.send(`The server's new prefix is now **${Arguments[0]}**`).then(m => m.delete({ timeout: 5000 }))
  }
},

  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["pre"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"]
  },

  exports.help = {
    name: "Prefix",
    description: "I will set the server's Prefix to your choice.",
    usage: "<new prefix>",
    category: "⚙config⚙",
    cooldown: 2.5
  }