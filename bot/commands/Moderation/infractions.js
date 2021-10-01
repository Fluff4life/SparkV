const Discord = require("discord.js");

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  const User = message.mentions.members.first() || message.author;

  if (!User) {
    return message.reply(`${bot.config.Emojis.error} | Please mention someone to view their warnings!`);
  }

  if (!data.member.infractionsCount === 0) {
    return message.reply("This user doesn't have any infractions!");
  }

  const infractions = data.member.infractions.map(infraction => `**${infraction.type}** - <t:${~~(infraction.date / 1000)}:R>\n`);

  const warningsEmbed = new Discord.MessageEmbed()
  .setTitle(`${User.tag}'s infractions`)
  .setDescription(`${User} has **${data.member.infractionsCount}** warning${data.member.infractionsCount > 1 ? "s" : ""}.\n\n${infractions}`)
  .setFooter(bot.config.embed.footer, bot.user.displayAvatarURL())
  .setColor(bot.config.embed.color);

  message.reply({
    embeds: [warningsEmbed]
  });
}

module.exports = new cmd(execute, {
  description: `I'll display a user's warnings.`,
  dirname: __dirname,
  aliases: [],
  usage: `<user>`,
  perms: ["KICK_MEMBERS"],
});
