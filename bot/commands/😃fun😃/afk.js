const Discord = require(`discord.js`);

const user = require("../../../database/schemas/user");

exports.run = async (bot, message, args, command, data) => {
  const reason = args.slice(0).join(" ") || "No reason supplied.";

  if (data.user.afk) {
    data.user.afk = null;
    await data.user.save();

    message.reply(bot.config.bot.Responses.AFKWelcomeMessage);
  } else {
    data.user.afk = reason;
    await data.user.save();

    message.reply(`You're now AFK. Reason: ${reason}`);
  }
};
  exports.config = {
    name: `Afk`,
    description: `This command will set your status to AFK. If anyone pings you, that person will be notified that you are afk with your selected reason.`,
    aliases: [],
    usage: `<optional reason>`,
    category: `😃Fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 3
};
