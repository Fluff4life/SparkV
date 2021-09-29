const Discord = require("discord.js");

module.exports = {
  once: false,
  execute(bot, guild) {
    console.log(`SparkV has been removed from ${guild.name} (Id: ${guild.id}).`);

    const Logger = bot.channels.cache.get("831314946624454656");

    if (Logger) {
      const ServerRemovedEmbed = new Discord.MessageEmbed()
        .setTitle("🔽︱Guild Removed")
        .setDescription(`SparkV left **${guild.name} (${guild.id})**.`)
        .setColor("RED");

      Logger.send({
        embeds: [
          ServerRemovedEmbed
        ]
      });
    }
  },
};
