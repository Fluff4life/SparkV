const { MessageEmbed } = require(`discord.js`);

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  const User =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.guild.members.cache.find(
      User => User.user.username.toLowerCase() === args.slice(0).join(` `) || User.user.username === args[0],
    );
  const Reason = args.join(` `).slice(22) || `No reason provided.`;

  if (!args[0]) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Please mention someone to warn!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!User) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | I cannot find that member!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (User.id === message.author.id) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You cannot warn yourself.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  const MemberData = await bot.fetchMember(User.id, guild.id);
  const MemberPosition = member.roles.highest.position;
  const ModerationPosition = message.member.roles.highest.position;

  if (message.member.ownerID !== message.author.id && !ModerationPosition > MemberPosition) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Uh oh... I can\`t warn this user!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  const Infractions = MemberData.infractions.filter(infraction => infraction.type === "warn").length;
  const BanCount = data.guild.settings.warnsInfractions.ban;
  const KickCount = data.guild.settings.warnsInfractions.kick;

  data.guild.casesCount++;
  data.guild.save();

  const CaseInformation = {
    channel: message.channel.id,
    moderator: message.author.id,
    date: Date.now(),
    type: "warn",
    case: data.guild.casesCount,
    reason: Reason,
  };

  if (BanCount) {
    if (Infractions >= BanCount) {
      // Ban the user for going past the Ban Count.
    }

    if (!User) {
      return message
        .reply(`${bot.config.bot.Emojis.error} | I cannot find that member!`)
        .then(m => m.delete({ timeout: 5000 }));
    }

    if (User.id === message.author.id) {
      return message
        .reply(`${bot.config.bot.Emojis.error} | You cannot warn yourself.`)
        .then(m => m.delete({ timeout: 5000 }));
    }

    const MemberData = await bot.fetchMember(User.id, guild.id);
    const MemberPosition = member.roles.highest.position;
    const ModerationPosition = message.member.roles.highest.position;

    if (message.member.ownerID !== message.author.id && !ModerationPosition > MemberPosition) {
      return message
        .reply(`${bot.config.bot.Emojis.error} | Uh oh... I can\`t warn this user!`)
        .then(m => m.delete({ timeout: 5000 }));
    }

    const Infractions = MemberData.infractions.filter(infraction => infraction.type === "warn").length;
    const BanCount = data.guild.settings.warnsInfractions.ban;
    const KickCount = data.guild.settings.warnsInfractions.kick;

    data.guild.casesCount++;
    data.guild.save();

    const CaseInformation = {
      channel: message.channel.id,
      moderator: message.author.id,
      date: Date.now(),
      type: "warn",
      case: data.guild.casesCount,
      reason: Reason,
    };

    if (BanCount) {
      if (Infractions >= BanCount) {
        // Ban the user for going past the Ban Count.
      }
    }

    if (KickCount) {
      if (Infractions >= KickCount) {
        // Kick the user for going past the Kick Count.
      }
    }

    channel.send(CaseEmbed);
  }
}

module.exports = new cmd(execute, {
  description: `I will warn a user`,
  aliases: [],
  usage: `<user> <optional reason>`,
  perms: ["KICK_MEMBERS"],
});
