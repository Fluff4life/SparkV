const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message) {
	return await message.replyT(`The current date is <t:${~~(Date.now() / 1000)}:F>.`);
}

module.exports = new cmd(execute, {
	description: "Gets the current date.",
	dirname: __dirname,
	aliases: [],
	usage: ``,
	slash: true
});
