const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
	if (!message.member.voice.channel) {
		return message
			.replyT(`${bot.config.emojis.error} | You must be in a __**voice channel**__ to use this command!`);
	}

	if (!bot.distube.playing(message)) {
		return message
			.replyT(`${bot.config.emojis.error} | A song must be playing to use this command!`);
	}

	const queue = await bot.distube.getQueue(message);

	if (queue) {
		bot.distube.stop(message);

		await message.replyT({
			embed: {
				title: `${bot.config.emojis.error} | Stopped Song`,
				description: `Stopped currently playing song.`,
				color: `#0099ff`,

				thumbnail: {
					url: `https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/YouTube.jpg`,
				},

				footer: {
					text: `Stopped song`,
					icon_url: bot.user.displayAvatarURL(),
				},
			},
		});
	}
}

module.exports = new cmd(execute, {
	description: `Disconnects me from the voice channel and removes all songs in queue.`,
	dirname: __dirname,
	usage: "",
	aliases: ["disconnect", "leave"],
	perms: ["EMBED_LINKS"],
});
