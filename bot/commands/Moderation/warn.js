const { MessageEmbed } = require(`discord.js`);

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  const User = message.mentions.members.first();
  const Reason = args.join(` `).slice(22) || `No reason provided.`;

  if (!User) {
    return message.reply(`${bot.config.Emojis.error} | Please mention someone to warn!`);
  }

  if (User.id === message.author.id) {
    return message.reply(`${bot.config.Emojis.error} | You cannot warn yourself lmfao.`);
  }

  const MemberPosition = message.member.roles.highest.position;
  const ModerationPosition = message.member.roles.highest.position;

  if (message.guild.ownerId !== message.author.id && !ModerationPosition > MemberPosition) {
    return message.reply(`${bot.config.Emojis.error} | Uh oh... I can\`t warn this user! This user is either the owner, or is a higher rank than SparkV.`);
  }

  ++data.member.infractionsCount;
  data.member.infractions.push({
    type: Reason,
    date: Date.now(),
  });

  data.member.markModified("infractionsCount");
  data.member.markModified("infractions");
  await data.member.save();

  User.send(`You were warned in **${message.guild.name}**. Reason: ${Reason}`).catch(err => {
    message.channel.send(`You were warned in **${message.guild.name}**. Reason: ${Reason}\n\nI would've sent this in your DMs, but they were off.`);
    message.reply(`The user you mentioned has their DMs off. I pinged him instead.`);
  });

  const WarnEmbed = new MessageEmbed()
  .setTitle(`Successfully Warned ${User.tag}!`)
  .setDescription(`I successfully warned ${User} (${User.id}).`)
  .setFooter(bot.config.embed.footer, bot.user.displayAvatarURL())
  .setColor(bot.config.embed.color);

  message.reply({
    embeds: [WarnEmbed]
  });
}

module.exports = new cmd(execute, {
  description: `I will warn a user`,
  dirname: __dirname,
  aliases: [],
  usage: `<user> <optional reason>`,
  perms: ["KICK_MEMBERS"],
});
