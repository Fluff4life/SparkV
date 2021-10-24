const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args) {
	const role = message.mentions.roles.first();

	if (!role) {
		return message.channel.send("Please mention a role to get the id of.");
	}

	console.log(role.name, role.id);
	await message.replyT(`The id of the role **${role.name}** is **${role.id}**.`);
}

module.exports = new cmd(execute, {
	description: "4K avatar 512x512",
	dirname: __dirname,
	aliases: ["rid"],
	usage: `(@member) (optional: -url)`,
});
