const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!Bot.CheckPerm(message)){
      return message.channel.send("Acsess Denied. Only KingCh1ll can run this command!")
  }

  message.react("✔")
  message.channel.send("Shutting down. Please wait.")

  Bot.user.setPresence({
    activity: {
      name: `Bot is now shutting down.`,
      type: "CUSTOM_STATUS",
    },

    status: "idle",
  }),

  Bot.Wait(10)

  process.exit(1)
},
  
  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["sd"],
    mod_only: false
  },
  
  exports.help = {
    name: "Shutdown",
    description: "THIS WILL **NOT** WORK FOR ANYONE BESIDES ADMINS AND THE OWNER! This command shuts down the bot.",
    usage: "<Slowmode number>",
    category: "🧰utility🧰",
    cooldown: 5
  }