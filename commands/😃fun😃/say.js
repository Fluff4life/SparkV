const Discord = require("discord.js");

(exports.run = async (Bot, msg, Arguments) => {
  if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
    return;
  }

  const SayMessage = Arguments.join(" ");

  msg
    .delete()
    .catch(stuff => {});
  
  msg.channel.send(SayMessage + "\n*-" + msg.author.username + "*");
}),
  (exports.config = {
    enabled: true,
    guild_only: true,
    mod_only: false,
    aliases: ["talk"]
  }),
  (exports.help = {
    name: "Say",
    description: "I will say whatever you want me to say.",
    aliases: ["talk"],
    usage: "[message]",
    category: "😃fun😃",
    cooldown: 5
  });
