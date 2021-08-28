const Discord = require(`discord.js`);

(exports.run = async (bot, message, args, command, data) => {
    const User =
        message.guild.member(message.mentions.users.first()) ||
        message.guild.members.cache.get(args[0]) ||
        `@<${args[0]}>`;
    const Reason = args.join(` `).slice(22) || `No reason provided.`;

    if (!args[0]) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | Please mention someone to mute!`
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
            .reply(
                `${bot.config.bot.Emojis.error} | You cannot unmute yourself.`
            )
            .then((m) => m.delete({ timeout: 5000 }));
    }

    if (!User.kickable) {
        return message
            .reply(
                `${bot.config.bot.Emojis.error} | Uh oh... I can't unmute this user!`
            )
            .then((m) => m.delete({ timeout: 5000 }));
    }

    var Role = message.guild.roles.cache.find((role) =>
        role.name.toLowerCase().includes(`muted`)
    );

    if (!Role) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | I couldn't find the muted role! Please make sure the role is called, \`Muted\`.`
        );
    }

    if (User.roles.cache.has(Role)) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | This user isn't muted!`
        );
    }

    const VerificationEmbed = new Discord.MessageEmbed()
        .setTitle(`Convermination Prompt`)
        .setDescription(`Are you sure you want to do this?`)
        .setFooter(
            `Canceling in 60 seconds if no emoji reacted • ${bot.config.bot.Embed.Footer}`
        );

    const VerificationMessage = await message.reply(VerificationEmbed);
    const Emoji = await bot.PromptMessage(
        VerificationMessage,
        message.author,
        [bot.config.bot.Emojis.success, bot.config.bot.Emojis.error],
        60
    );

    if (Emoji === bot.config.bot.Emojis.success) {
        // Yes
        message.delete();

        User.roles.remove(Role);
        User.send(
            `${bot.config.bot.Emojis.success} | You have been unmuted in ${message.guild.name}. Reason: ${Reason}.`
        ).catch((err) => {});

        const MuteEmbend = new Discord.MessageEmbed()
            .setTitle(`${bot.config.bot.Emojis.success} | Unmute Command`)
            .setDescription(`Successfully unmuted ${User}(${User.id})`)
            .setThumbnail(User.avatar)
            .addField(`Moderator/Admin: `, `${message.author.tag}`)
            .addField(`Reason: `, Reason)
            .setFooter(
                `${bot.config.bot.prefix}Mute to mute a user • ${bot.config.bot.Embed.Footer}`
            )
            .setColor(bot.config.bot.Embed.Color)
            .setTimestamp();

        message.reply(MuteEmbend);
    } else if (emoji === bot.config.bot.Emojis.error) {
        message.delete();

        message
            .reply(`${bot.config.bot.Emojis.error} | Unmute canceled.`)
            .then((m) => m.delete({ timeout: 10000 }));
    }
}),
    (exports.config = {
        name: `Unmute`,
        description: `I'll unmute someone who was muted previously.`,
        aliases: [],
        usage: `<user> <reason>`,
        category: `🛠️Moderation🛠️`,
        bot_permissions: [
            `SEND_MESSAGES`,
            `EMBED_LINKS`,
            `VIEW_CHANNEL`,
            `MANAGE_CHANNELS`,
        ],
        member_permissions: [`MANAGE_ROLES`],
        enabled: true,
        cooldown: 5,
    });
