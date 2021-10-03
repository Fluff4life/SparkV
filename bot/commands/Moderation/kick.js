const Discord = require(`discord.js`);

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  const UserToKick =
    message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]) || `@<${args[0]}>`;
  const ReasonForKick = args.join(` `).slice(22) || `No reason provided.`;

  if (!args[0]) {
    return message
      .replyT(`${bot.config.Emojis.error} | Please mention someone to kick!`);
  }

  if (!UserToKick) {
    return message
      .replyT(`${bot.config.Emojis.error} | I cannot find that member!`);
  }

  if (UserToKick.id === message.author.id) {
    return message
      .replyT(`${bot.config.Emojis.error} | You cannot kick yourself.`);
  }

  if (!UserToKick.kickable) {
    return message
      .replyT(`${bot.config.Emojis.error} | Uh oh... I can't kick this user!`);
  }

  const VerificationEmbed = new Discord.MessageEmbed()
    .setTitle(`Convermination Prompt`)
    .setDescription(`Are you sure you want to do this?`)
    .setFooter(`Canceling in 60 seconds if no emoji reacted. • ${bot.config.embed.footer}`);

  const VerificationMessage = await await message.replyT({
    embeds: [VerificationEmbed],
  });

  const Emoji = await bot.PromptMessage(
    VerificationMessage,
    message.author,
    [bot.config.Emojis.success, bot.config.Emojis.error],
    60,
  );

  if (Emoji === bot.config.Emojis.success) {
    // Yes
    message.delete().catch(err => {});

    UserToKick.kick().catch(async err => await message.replyT(`${bot.config.Emojis.error} | Failed to kick. Error: ${err}`));

    try {
      UserToKick.send(
        `${bot.config.Emojis.error} | You have been kicked from ${message.guild.name}. Reason: ${ReasonForKick}.`,
      );
    } catch (err) {}

    const KickEmbend = new Discord.MessageEmbed()
      .setTitle(`Kick Command`)
      .setDescription(`${bot.config.Emojis.success} | Successfully kicked <@${UserToKick.id}>(${UserToKick.id})!`)
      .setThumbnail(UserToKick.avatar)
      .addField(`Moderator/Admin: `, `${message.author.tag}`)
      .addField(`Reason: `, ReasonForKick)
      .setFooter(`${bot.config.prefix}Ban to ban a user. • ${bot.config.embed.footer}`)
      .setColor(bot.config.embed.color)
      .setTimestamp();

    await message.replyT(KickEmbend);
  } else if (emoji === bot.config.Emojis.error) {
    message.delete().catch(err => {});

    await message.replyT(`${bot.config.Emojis.error} | Kick canceled.`).then(m => m.delete({ timeout: 10000 }));
  }
}

module.exports = new cmd(execute, {
  description: `Is a user bothering you? Using this command, you can kick them from the server!`,
  dirname: __dirname,
  aliases: [],
  usage: `<user> <optional user>`,
  perms: ["KICK_MEMBERS"],
});
