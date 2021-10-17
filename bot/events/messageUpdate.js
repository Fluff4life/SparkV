const Discord = require("discord.js");

module.exports = {
	once: false,
	execute(bot, oldM, newM) {
		if (!newM.editedAt) return;

		bot.emit("messageCreate", newM);
	},
};
