const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
	const queue = bot.distube.getQueue(message);

	if (!queue) {
		return await message.replyT(`${bot.config.emojis.error} | The queue is empty! Try adding some songs.`);
	}

	await message.replyT({
		embed: {
			title: `${bot.config.emojis.music} | Queue for ${message.guild.name}`,
			description: queue.songs
				.map((song, id) => `**${id + 1}**. ${song.name} - ${song.formattedDuration}`)
				.slice(0, 10)
				.join(`\n`),
			color: `#0099ff`,
			thumbnail: {
				url: message.author.displayAvatarURL({
					dynamic: true,
					format: "gif",
				}),
			},
			footer: {
				text: `Displaying music queue.`,
				icon_url: bot.user.displayAvatarURL(),
			},
		},
	});
}

module.exports = new cmd(execute, {
	description: `Shows the songs in queue.`,
	dirname: __dirname,
	usage: "<number>",
	aliases: ["que"],
	perms: ["EMBED_LINKS"],
});
