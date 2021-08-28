const Discord = require(`discord.js`);
const Levels = require(`discord-xp`);
const canvacord = require(`canvacord`);

exports.run = async (bot, message, args, command, data) => {
    const Target = (await bot.GetMember(message, args)) || message.author;
    const User = await Levels.fetch(Target.id, message.guild.id, true);
    const NeededXP = Levels.xpFor(parseInt(User.level) + 1);

    if (!User) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | This user hasn't earned any XP yet!`
        );
    }

    const Rank = new canvacord.Rank()
        .setUsername(Target.username)
        .setDiscriminator(Target.discriminator)
        .setAvatar(Target.displayAvatarURL({ dynamic: false, format: `gif` }))
        .setStatus(Target.presence?.status)
        .setRank(User.position)
        .setLevel(User.level || 0)
        .setCurrentXP(User.xp || 0)
        .setRequiredXP(NeededXP || 100)
        .setProgressBar(`#0099ff`, `COLOR`);

    Rank.build().then((data) => {
        const Attachment = new Discord.MessageAttachment(
            data,
            `${Target.tag}RankCard.gif`
        );

        return message.reply({
            files: [Attachment],
        });
    });
};
exports.config = {
    name: `Rank`,
    description: `View a users rank!`,
    aliases: [],
    usage: `<optional user>`,
    category: `😃Fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`],
    member_permissions: [],
    enabled: true,
    cooldown: 5,
};
