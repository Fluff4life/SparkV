const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args) {
	const User = await bot.functions.fetchUser(args[0]);

	if (User) {
		return await message.replyT(`The id of **${User.username}#${User.discriminator}** is **${User.id}**.`);
	} else {
		return await message.replyT(`The id of **${message.author.tag}** is **${message.author.id}**.`);
	}
}

module.exports = new cmd(execute, {
	description: "Gets the ID of the mentioned user. If you don't mention someone, I will send your ID instead.",
	dirname: __dirname,
	aliases: ["uid", "id"],
	usage: `(optional: @member)`
});
