const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
    var invites = []; // starting array
    Bot.guilds.cache.forEach(async (guild) => { // iterate loop on each guild bot is in

      // get the first channel that appears from that discord, because
      // `.createInvite()` is a method for a channel, not a guild.
      const channel = guild.channels.cache 
        .filter((channel) => channel.type === 'text')
        .first();
      if (!channel || guild.member(client.user).hasPermission('CREATE_INSTANT_INVITE')) return;
      
      await channel
        .createInvite({ maxAge: 0, maxUses: 0 })
        .then(async (invite) => {
          invites.push(`${guild.name} - ${invite.url}`); // push invite link and guild name to array
        })
        .catch((error) => console.log(error));
      console.log(invites);
    });
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