const Discord = require(`discord.js`);

const user = require("../../../database/schemas/user");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const reason = args.slice(0).join(" ") || "No reason supplied.";

  if (data.user.afk) {
    data.user.afk = null;
    await data.user.save();

    message.reply(bot.config.Responses.AFKWelcomeMessage);
  } else {
    data.user.afk = reason;
    await data.user.save();

    message.reply(`You're now AFK. Reason: ${reason}`);
  }
}

module.exports = new cmd(execute, {
  description: `This command will set your status to AFK. If anyone pings you, that person will be notified that you are afk with your selected reason.`,
  dirname: __dirname,
  aliases: [],
  usage: `<optional reason>`,
});
