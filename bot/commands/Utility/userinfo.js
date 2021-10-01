const os = require("os");
const Discord = require("discord.js");

const cmd = require("../../templates/command");

module.exports = new cmd(
  async (bot, message, args) => {
    const user = bot.users.cache.get(args[0]) || message.author;
    let member = message.channel.guild.members.cache.get(user.id);

    const InfoEmbed = new Discord.MessageEmbed()
    .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true, format: "png" }))
    .addFields(
        {
            name: "**Account Info**",
            value: `Joined: <t:${~~(member.joinedAt / 1000)}:R>\nRegistered: <t:${~~(user.createdAt / 1000)}:R>`,
            inline: true,
          },
          {
            name: "**Profile Links**",
            value: `Avatar URL: [Click Here](${user.displayAvatarURL({ dynamic: true, format: "png" })})`,
            inline: true,
          },
    )
    .setFooter(bot.config.embed.footer, bot.user.displayAvatarURL({ dynamic: true, format: "png" }))
    .setColor(bot.config.embed.color);

    message.reply({
        embeds: [InfoEmbed]
    });
  },
  {
    description: "See information about a user.",
    dirname: __dirname,
    usage: "<user>",
    aliases: ["ui"],
    perms: ["EMBED_LINKS"],
  },
);
