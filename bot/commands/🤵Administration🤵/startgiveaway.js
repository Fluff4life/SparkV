const Discord = require(`discord.js`);
const ms = require(`ms`);

(exports.run = async (bot, message, args, command, data) => {
<<<<<<< HEAD
  const Channel = message.mentions.channels.first();
  const Duration = args[1];
  const Winners = args[2];
  const Prize = args.slice(3).join(` `);
=======
    const Channel = message.mentions.channels.first();
    const Duration = args[1];
    const Winners = args[2];
    const Prize = args.slice(3).join(` `);
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    if (!Channel) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | Please provide a valid channel.`
        );
    }

    if (!Duration || isNaN(ms(Duration))) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | Please provide a valid duration.`
        );
    }

    if (!Winners || isNaN(Winners) || parseInt(Winners) <= 0) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | Please provide a valid number of winners!`
        );
    }

<<<<<<< HEAD
    messages: {
      giveaway: `⚡ New Giveaway! ⚡`,
      giveawayEnded: `🎉 Giveaway Ended 🎉`,
      timeRemaining: `⏳ Time remaining: **{duration}**! ⏳`,
      inviteToParticipate: `🎉 React to enter! 🎉`,
      winMessage: `⚡ Congrats, {winners}! You won just **{prize}**! ⚡`,
      noWinner: `${bot.config.bot.Emojis.error} |  Couldn't determine a winner. Please do ^Reroll.`,
      hostedBy: `❔ Giveaway hosted by {user}!`,
      embedFooter: `Thanks for using Ch1llBlox!`,
      winners: `winner(s)`,
      endedAt: `Ends at`,
      units: {
        seconds: `seconds`,
        minutes: `minutes`,
        hours: `hours`,
        days: `days`,
        pluralS: false,
      },
    },
  });

  message.reply(`${bot.config.bot.Emojis.success} | Giveaway starting in ${Channel}!`);
}),
  (exports.config = {
    name: `StartGiveaway`,
    description: `Starts a giveaway. Requires the permision MANAGE_MESSAGES.`,
    aliases: [`startg`],
    usage: `<channel> <duration> <winners> <prize>`,
    category: `🤵Administration🤵`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [`MANAGE_MESSAGES`],
    enabled: true,
    cooldown: 10,
  });
=======
    if (!Prize) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | Why do you want to give away nothing lol.`
        );
    }

    bot.GiveawayManager.start(Channel, {
        time: ms(Duration),
        prize: Prize,
        winnerCount: Winners,
        hostedBy: message.author,

        messages: {
            giveaway: `⚡ New Giveaway! ⚡`,
            giveawayEnded: `🎉 Giveaway Ended 🎉`,
            timeRemaining: `⏳ Time remaining: **{duration}**! ⏳`,
            inviteToParticipate: `🎉 React to enter! 🎉`,
            winMessage: `⚡ Congrats, {winners}! You won just **{prize}**! ⚡`,
            noWinner: `${bot.config.bot.Emojis.error} |  Couldn't determine a winner. Please do ^Reroll.`,
            hostedBy: `❔ Giveaway hosted by {user}!`,
            embedFooter: `Thanks for using Ch1llBlox!`,
            winners: `winner(s)`,
            endedAt: `Ends at`,
            units: {
                seconds: `seconds`,
                minutes: `minutes`,
                hours: `hours`,
                days: `days`,
                pluralS: false,
            },
        },
    });

    message.reply(
        `${bot.config.bot.Emojis.success} | Giveaway starting in ${Channel}!`
    );
}),
    (exports.config = {
        name: `StartGiveaway`,
        description: `Starts a giveaway. Requires the permision MANAGE_MESSAGES.`,
        aliases: [`startg`],
        usage: `<channel> <duration> <winners> <prize>`,
        category: `🤵Administration🤵`,
        bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
        member_permissions: [`MANAGE_MESSAGES`],
        enabled: true,
        cooldown: 10,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
