const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
  const InvitesEmbend = new Discord.MessageEmbed()
    .setTitle("Invites")
    .setDescription(`Here are some invites!`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
    .addField("Support Server: ", process.env.support_server_invite, true)
    .addField("Bot Invite: ", process.env.bot_invite, true)
    .setFooter(`Try command ${process.env.prefix}Meme!`, process.env.bot_logo)
    .setColor("#0099ff");
  await msg.channel.send(InvitesEmbend);
},
  
  exports.config = {
    enabled: true,
    guild_only: true,
    mod_only: false,
    aliases: ["invite", "support"]
  },
  
  exports.help = {
    name: "Invite",
    description:
      "Need help with me or you want to invite me to your server? This command makes inviting easy!",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 1.5
  }