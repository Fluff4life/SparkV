const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (message.author.id !== process.env.OwnerID) {
    return message.lineReplyNoMention("❌Access denied.")
  }
  
  const RestartStatus = await message.lineReplyNoMention(`⚡ Ch1llBlox is now preparing for restart. Time left: ${Timer} seconds.`)
  var Timer = 15

  setTimeout(() => {
    process.exit()
  }, Timer * 2.5 * 1000)

  setInterval(() => {
    --Timer

    if (Timer > 0){
      RestartStatus.edit(`⚡ Ch1llBlox is now preparing for restart. Time left: ${Timer} seconds.`)
    } else {
      RestartStatus.edit(`⚡ Ch1llBlox is now restarting...`)
    }
  }, 1000)
},

  exports.config = {
    name: "Restart",
    description: "This is an owner only command.",
    aliases: [],
    usage: "",
    category: "👑owner👑",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 5
  }