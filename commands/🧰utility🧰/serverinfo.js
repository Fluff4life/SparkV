const Discord = require("discord.js");

(exports.run = async (Bot, msg) => {
  let icon = msg.guild.splashURL;
  let users = msg.guild.members.cache.filter(m => !m.user.bot).size;
  let bots = msg.guild.members.cache.filter(m => m.user.bot).size;

  const ServerInfo = new Discord.MessageEmbed()
    .setTitle(`Here is ${msg.guild.name}'s server information!`)
    .setDescription(`*At times, this command can be very glitchy.*`)
    .setImage(icon)
    .addField(`Server owner:`, `<@${msg.guild.ownerID}>`, true)
    .addField(
      `Member Count: `,
      `**All Members**: ${msg.guild.memberCount}\n**Humans** ${users}\n**Bots** ${bots}`,
      true
    )
    .addField(
      `Member Status: `,
      `**Online** ${
        msg.guild.members.cache.filter(m => m.presence.status === "online").size
      }\n**Idle** ${
        msg.guild.members.cache.filter(m => m.presence.status === "idle").size
      }\n**DND** ${
        msg.guild.members.cache.filter(m => m.presence.status === "dnd").size
      }\n**Offline** ${
        msg.guild.members.cache.filter(m => m.presence.status === "offline")
          .size
      }`,
      true
    )
    .setFooter(
      `You should try ${process.env.prefix}Meme!`,
      process.env.bot_logo
    )
    .setColor("#0099ff")
    .setTimestamp();

  msg.channel.send(ServerInfo);
}),
  (exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["ss", "serverdetails"],
    mod_only: false
  }),
  (exports.help = {
    name: "ServerInfo",
    description:
      "I will get information of the server you are in and send it to you.",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 1.5
  });
