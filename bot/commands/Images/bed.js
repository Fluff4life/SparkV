const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args) {
	const User = (await bot.functions.fetchUser(args[0])) || message.author;
	const User2 = (await bot.functions.fetchUser(args[1])) || message.author;

	const Image = await canvacord.Canvas.bed(
		User.displayAvatarURL({ format: "png" }),
		User2.displayAvatarURL({ format: "png" }),
	);

	await message.replyT({
		files: [new Discord.MessageAttachment(Image, "bed.png")],
	});
}

module.exports = new cmd(execute, {
	description: "Why do you hate me, brother?",
	aliases: ["underbed"],
	dirname: __dirname,
	usage: `<optional user>`,
});
