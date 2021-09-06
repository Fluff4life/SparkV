const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

const Credits = [
  {
    name: "**🛠 | Developers**",
    value: "The people who made Ch1llBlox!\n**KingCh1ll** - Head Developer\n**Qu1ckly_Frost** - Developer",
    inline: true,
  },
  {
    name: "**✨ | Contributors**",
    value: "People that have contributed to Ch1llBlox.\n**2Lost4Discord** - Getting the bot verified.",
    inline: true,
  },
];

module.exports = new cmd((bot, message) => {
  const NewEmbed = new Discord.MessageEmbed()
    .setTitle("Credits")
    .setDescription(`Here's the list of people who've helped Ch1llBlox on his path to success!`)
    .setColor(bot.config.bot.Embed.Color)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "gif" }))
    .addFields(Credits);

  return message.reply(NewEmbed);
}, {
  description: `Look at everyone who helped make Ch1llBlox!`,
  dirname: __dirname,
  usage: "",
  aliases: ["deleteg"],
  perms: ["EMBED_LINKS"],
});
