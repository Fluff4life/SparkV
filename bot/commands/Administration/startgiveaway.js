const Discord = require(`discord.js`);
const ms = require(`ms`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const Channel = message.mentions.channels.first();
  const Duration = args[1];
  const Winners = args[2];
  const Prize = args.slice(3).join(` `);

  if (!Channel) {
    return message.reply(`${bot.config.bot.Emojis.error} | Please provide a valid channel.`);
  }

  if (!Duration || isNaN(ms(Duration))) {
    return message.reply(`${bot.config.bot.Emojis.error} | Please provide a valid duration.`);
  }

  if (!Winners || isNaN(Winners) || parseInt(Winners) <= 0) {
    return message.reply(`${bot.config.bot.Emojis.error} | Please provide a valid number of winners!`);
  }

  if (!Prize) {
    return message.reply(`${bot.config.bot.Emojis.error} | Why do you want to give away nothing lol.`);
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

  message.reply(`${bot.config.bot.Emojis.success} | Giveaway starting in ${Channel}!`);
}

module.exports = new cmd(execute, {
  description: `Starts a giveaway. Requires the permision MANAGE_MESSAGES.`,
  usage: `<channel> <duration> <winners> <prize>`,
  aliases: ["startg"],
  perms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  gname: "youtube",
  type: "together",
});
