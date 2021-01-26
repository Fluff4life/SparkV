const Discord = require("discord.js");
const noblox = require("noblox.js");

exports.run = async (Bot, msg, Arguments, command) => {
  const IsAdmin = Bot.CheckPerm(msg);

  Arguments = Arguments.join(" ")
  
  if (IsAdmin === true){
    try {
      noblox.shout(process.env.RobloxGroup, Arguments)
      
      const SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("Success!")
        .setDescription("Successfully shouted " + Arguments.Join())
        .setURL("https://www.roblox.com/groups/7813201/Ch1ll-Studios")
        .setFooter("Shout Command Failed", process.env.bot_logo)
        .setColor("#0099ff");
      
      return await msg.reply(SuccessEmbed)
    }
    catch(err){
      const ErrorEmbed = new Discord.MessageEmbed()
        .setTitle("⚠️Error!")
        .setDescription(`Error shouting. Here's the error: ${err}`)
        .setFooter("⚠️Shout Command Failed", process.env.bot_logo)
        .setColor("#0099ff");
      
      return await msg.reply(ErrorEmbed)
    }
  } else {
    const NoPermsEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid Permisions")
      .setDescription("You don't have permision to use this command!")
      .setFooter("Shout Command Failed", process.env.bot_logo)
      .setColor("#0099ff");

    return await msg.reply(NoPermsEmbed);
  }
};

(exports.config = {
  enabled: true,
  guild_only: false,
  aliases: ["s"],
  mod_only: false
}),
  (exports.help = {
    name: "Shout",
    description: "Ch1ll Bot will shout to any group!",
    usage: "<What to shout>",
    cooldown: 10,
    category: "🔴Roblox🔴"
  });
