const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
    if (!Bot.CheckPerm(msg)){
        return msg.channel.send("❌Access denied.")
    }

    Bot.guilds.cache.forEach(async(guild) => {
      const channel = guild.channels.cache 
        .filter((channel) => channel.type === 'text')
        .first()

      if (!guild.member(Bot.user).hasPermission('CREATE_INSTANT_INVITE')){
          return;
      }

      await channel
        .createInvite({ maxAge: 120, maxUses: 1 })
        .then(async(invite) => {
            console.log(`${guild.name} - ${invite.url}`)
        })
        .catch((error) => console.log(error));
    })
},
  
  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["invite", "support"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },
  
  exports.help = {
    name: "Eval",
    description: "undefined",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 1.5
  }