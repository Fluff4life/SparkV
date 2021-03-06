const Discord = require("discord.js");
const Noblox = require("noblox.js")
exports.run = async (Bot, message, Arguments) => {
  if (!Arguments[0]) {
    return message.channel.send("You have to tell me your group ID.").then(m => m.delete({ timeout: 5000 }))
  }

  if (isNaN(parseInt(Arguments[0]))) {
    return message.channel.send("That's not a number!")
  }

  Bot.Database.set(`ServerData_${message.guild.id}.GroupID`, parseInt(Arguments[0]))

  Noblox.generalRequest("//www.roblox.com/Groups/Group.aspx?gid=1", { __EVENTTARGET: 'JoinGroupDiv', __EVENTARGUMENT: 'Click' })

  message.channel.send(`Ch1llBlox is now joining your group. If he does not come on for longer than 10 minutes, something is wrong. GroupID: ${Arguments[0]}.`)
},

  exports.config = {
    name: "🆕SetGroupID",
    description: "Ch1llBlox will join your group and assist you.",
    aliases: ["nospam"],
    usage: "<on or off>",
    category: "⚙config⚙",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    member_permissions: ["ADMINISTRATOR"],
    enabled: true,
    cooldown: 2.5
  }