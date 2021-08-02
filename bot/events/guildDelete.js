const Discord = require('discord.js');

exports.run = async (bot, guild) => {
  console.log(`Ch1llBlox has been removed from ${guild.name} (Id: ${guild.id}).`);

  const Logger = bot.channels.cache.get(840330596609949696);

  if (Logger) {
    const ServerAddedEmbed = Discord.MessageEmbed()
      .setTitle('🔼︱Guild Removed')
      .setDescription(`Ch1llBlox left ${guild.name} (${guild.id}).`)
      .setColor('RED');

    Logger.send(ServerAddedEmbed);
  }
};
