const { MessageEmbed } = require(`discord.js`);

(exports.run = async (bot, message, args, command, data) => {
    const User =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
            (User) =>
                User.user.username.toLowerCase() === args.slice(0).join(` `) ||
                User.user.username === args[0]
        );
    const Reason = args.join(` `).slice(22) || `No reason provided.`;

    if (!args[0]) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | Please mention someone to warn!`
            )
            .then((m) => m.delete({ timeout: 5000 }));
    }

    if (!User) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | I cannot find that member!`
            )
            .then((m) => m.delete({ timeout: 5000 }));
    }

    if (User.id === message.author.id) {
        return message
            .reply(`${bot.config.bot.Emojis.error} | You cannot warn yourself.`)
            .then((m) => m.delete({ timeout: 5000 }));
    }

    const MemberData = await bot.fetchMember(User.id, guild.id);
    const MemberPosition = member.roles.highest.position;
    const ModerationPosition = message.member.roles.highest.position;

    if (
        message.member.ownerID !== message.author.id &&
        !ModerationPosition > MemberPosition
    ) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | Uh oh... I can\`t warn this user!`
            )
            .then((m) => m.delete({ timeout: 5000 }));
    }

    const Infractions = MemberData.infractions.filter(
        (infraction) => infraction.type === "warn"
    ).length;
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

    const CaseEmbed = new Discord.MessageEmbed()
        .setTitle(`${Bot.Config.Bot.Emojis.success} | Warn Successful`)
        .setDiscription(`Successfully warned ${User} for ${Reason}`)
        .setThumbnail(User.avatar)
        .addField(`**User**`, `${message.user.tag} (${member.user.toString()})`)
        .addField(
            `**Moderator**`,
            `${message.author.tag} (${message.author.toString()})`
        )
        .addField(`**Reason**`, Reason, true)
        .setFooter(
            `Case #${data.guild.casesCount} • ${bot.config.bot.Embed.Footer}`
        )
        .setColor(bot.config.bot.Embed.Color)
        .setTimestamp();

    message.reply(CaseEmbed);

    MemberData.infractions.push(CaseInformation);
    MemberData.save();

    if (data.guild.plugins.modlogs) {
        const channel = message.guild.channels.cache.get(
            data.guild.plugins.modlogs
        );

        if (!channel) {
            return;
        }

        channel.send(CaseEmbed);
    }
}),
    (exports.config = {
        name: `Warn`,
        description: `I will warn a user`,
        aliases: [`w`],
        usage: `<user> <optional reason>`,
        category: `🛠️Moderation🛠️`,
        bot_permissions: [
            `SEND_MESSAGES`,
            `EMBED_LINKS`,
            `VIEW_CHANNEL`,
            `MANAGE_MESSAGES`,
            `ADD_REACTIONS`,
        ],
        member_permissions: [`MANAGE_MESSAGES`],
        enabled: true,
        cooldown: 15,
    });
