const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message) {
	const { Calculator } = require("weky");

	await Calculator({
		message: message,
		embed: {
			title: "Calculator",
			color: "#7289da",
			footer: bot.config.embed.footer,
			timestamp: true,
		},
		disabledQuery: "Calculator is disabled!",
		invalidQuery: "The provided equation is invalid!",
		othersMessage: "Only <@{{author}}> can use the buttons!",
	});
}

module.exports = new cmd(execute, {
	description: `Calculate any equation!`,
	aliases: ["calc"],
	dirname: __dirname,
	usage: ``,
});
