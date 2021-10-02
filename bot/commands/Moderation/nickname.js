const Discord = require(`discord.js`);

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  const User =
    message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]) || `@<${args[0]}>`;
  const NewNickname = args.join(` `).slice(22);

  if (!args[0]) {
    return message
      .reply(`${bot.config.Emojis.error} | Please mention someone to change their nickname!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!User) {
    return message
      .reply(`${bot.config.Emojis.error} | I cannot find that member!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!User.roles) {
    return message
      .reply(`${bot.config.Emojis.error} | That\`s not a user! That\`s a role.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!NewNickname) {
    return message
      .reply(`${bot.config.Emojis.error} | Please mention their new nickname!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (User.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
    return message.reply(`Uh oh! I cannot change their nickname. They\`re a higher role than me!`);
  }

  const VerificationEmbed = new Discord.MessageEmbed()
    .setTitle(`Convermination Prompt`)
    .setDescription(`Are you sure you want to do this?`)
    .setFooter(`Canceling in 60 seconds if no emoji reacted • ${bot.config.embed.footer}`);

  const VerificationMessage = await message.reply({
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
    Verificationmessage.delete().catch(err => {});

    User.setNickname(NewNickname)
      .then(() => {
        message.reply(`${bot.config.Emojis.success} | I successfully changed ${User}\`s nickname to ${NewNickname}!`);
      })
      .catch(err => {
        message.reply(`${bot.config.Emojis.error} | Uh oh! I cannot change their nickname.`).then(() => {
          console.error(err);
        });
      });
  } else if (emoji === bot.config.Emojis.error) {
    message.delete().catch(err => {});

    message.reply(`${bot.config.Emojis.error} | Nickname change canceled.`).then(m => m.delete({ timeout: 10000 }));
  }
}

module.exports = new cmd(execute, {
  description: `I\'ll change a user\'s nickname to your choice.`,
  dirname: __dirname,
  aliases: ["setnick"],
  usage: `<user> <reason>`,
  perms: ["CHANGE_NICKNAME"],
});
