const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args) {
	const User = await bot.functions.fetchUser(args[0]) || message.author;
	const avatar = User.displayAvatarURL({ dynamic: true, format: "png" });

	if (message.content.includes("-url")) {
		await message.replyT(`URL: <${avatar}>`);
	}

	await message.replyT({
		files: [new Discord.MessageAttachment(avatar, `${User.tag}-avatar.png`)],
	});
}

module.exports = new cmd(execute, {
	description: "4K avatar 512x512",
	dirname: __dirname,
	aliases: [],
	usage: `(@member) (optional: -url)`,
});
