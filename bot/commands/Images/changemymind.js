const Discord = require(`discord.js`);
const canvacord = require(`canvacord`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
	if (!args || !args[0]) {
		return await message.replyT(`Please provide text.`);
	}

	args = args.join(` `);

	const Image = await canvacord.Canvas.changemymind(args);

	await message.replyT({
		files: [new Discord.MessageAttachment(Image, "affect.png")],
	});
}

module.exports = new cmd(execute, {
	description: `Change my mind.`,
	aliases: ["cmm"],
	dirname: __dirname,
	usage: `<text>`,
});
