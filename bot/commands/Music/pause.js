const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
	if (!message.member.voice.channel) {
		return message
			.replyT(`${bot.config.emojis.error} | You must be in a __**voice channel**__ to use this command!`);
	}

	const queue = await bot.distube.getQueue(message);

	if (!queue) {
		return await message.replyT(
			`${bot.config.emojis.error} | There is nothing in the queue right now! Try playing some songs.`,
		);
	}

	bot.distube.pause(message);
	await message.replyT(`${bot.config.emojis.music} | I paused the song for you!`);
}

module.exports = new cmd(execute, {
	description: `Pauses the current song playing.`,
	dirname: __dirname,
	usage: "",
	aliases: ["softstop"],
	perms: ["EMBED_LINKS"],
});
