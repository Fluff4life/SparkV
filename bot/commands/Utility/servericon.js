const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args) {
	const guildIcon = message.guild.iconURL();

	if (message.content.includes("-url")) {
		await message.replyT(`URL: <${guildIcon}>`);
	}

	await message.replyT({
		files: [
			new Discord.MessageAttachment(guildIcon, `${message.guild.name.length >= 10 ? `${message.guild.name.slice(0, 10)}...` : message.guild.name}-guildIcon.png`)
		],
	});
}

module.exports = new cmd(execute, {
	description: "4K server icon 512x512",
	dirname: __dirname,
	aliases: [],
	usage: `(optional: -url)`,
});
