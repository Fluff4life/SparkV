const Discord = require(`discord.js`);

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  const User =
    message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]) || `@<${args[0]}>`;
  const Reason = args.join(` `).slice(22) || `No reason provided.`;

  if (!args[0]) {
    return message
      .reply(`${bot.config.Emojis.error} | Please mention someone to mute!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!User) {
    return message
      .reply(`${bot.config.Emojis.error} | I cannot find that member!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (User.id === message.author.id) {
    return message
      .reply(`${bot.config.Emojis.error} | You cannot mute yourself.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!User.kickable) {
    return message
      .reply(`${bot.config.Emojis.error} | Uh oh... I can't mute this user!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (User.user.bot) {
    return message.reply(`I cannot mute bots!`);
  }

  const Roles = User.roles.cache.filter(role => role.id !== message.guild.id).map(role => role.id);
  let MutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes(`muted`));

  if (!MutedRole) {
    if (!message.guild || !message.guild.roles) {
      return message.reply(`Uh oh! An error occured. Make sure I have the correct permisions.`);
    }

    MutedRole = await message.guild.roles.create({
      data: {
        name: `Muted`,
        color: `#514f48`,
        permissions: [],
      },
    });

    message.guild.channels.cache.forEach(async channel => {
      await channel.createOverwrite(MutedRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: true,
        SPEAK: false,
        CONNECT: true,
      });
    });
  }

  if (User.roles.cache.has(MutedRole.id)) {
    return message.reply(`This user is already muted!`);
  }

  const VerificationEmbed = new Discord.MessageEmbed()
    .setTitle(`Convermination Prompt`)
    .setDescription(`Are you sure you want to do this?`)
    .setFooter(`Canceling in 60 seconds if no emoji reacted. • ${bot.config.embed.footer}`);

  const VerificationMessage = await message.reply({
    embeds: [VerificationEmbed],
  });

  const Emoji = await bot.PromptMessage(
    VerificationMessage,
    message.author,
    [`✅`, `${bot.config.Emojis.error} | `],
    60,
  );

  if (Emoji === `✅`) {
    // Yes
    message.delete().catch(err => {});

    User.roles.add(MutedRole);
    User.send(`You have been muted in ${message.guild.name}. Reason: ${Reason}.`).catch(err => {});

    const MuteEmbend = new Discord.MessageEmbed()
      .setTitle(`Mute Command`)
      .setDescription(`${bot.config.Emojis.success} | Successfully Muted <@${User.id}>(${User.id})!`)
      .setThumbnail(User.avatar)
      .addField(`Moderator/Admin: `, `${message.author.tag}`)
      .addField(`Reason: `, Reason)
      .setFooter(`${bot.config.prefix}Unmute to unmute a user. • ${bot.config.embed.footer}`)
      .setColor(bot.config.embed.color)
      .setTimestamp();

    message.reply({
      embeds: [MuteEmbend],
    });
  } else if (emoji === `${bot.config.Emojis.error} | `) {
    message.delete().catch(err => {});

    message.reply(`${bot.config.Emojis.error} | Mute canceled.`).then(m => m.delete({ timeout: 10000 }));
  }
}

module.exports = new cmd(execute, {
  description: `I'll mute someone.`,
  dirname: __dirname,
  aliases: [],
  usage: `<user> <reason>`,
  perms: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
});
