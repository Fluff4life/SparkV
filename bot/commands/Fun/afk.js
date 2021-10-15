const Discord = require(`discord.js`);

const user = require("../../../database/schemas/user");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const reason = args.slice(0).join(" ") || "No reason supplied.";

  if (data.user.afk) {
    data.user.afk = null;
    data.user.markModified("afk");
    await data.user.save();

    await message.replyT(bot.config.responses.AFKWelcomeMessage);
  } else {
    data.user.afk = reason;
    data.user.markModified("afk");
    await data.user.save();

    await message.replyT(`You're now AFK. Reason: ${reason}`);
  }
}

module.exports = new cmd(execute, {
  description: `This command will set your status to AFK. If anyone pings you, that person will be notified that you are afk with your selected reason.`,
  dirname: __dirname,
  aliases: [],
  usage: `<optional reason>`,
});
