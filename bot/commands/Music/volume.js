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

	if (isNaN(args[0])) {
		return await message.replyT(`${bot.config.emojis.error} | That's not a valid number!`);
	}

	if (parseInt(args[0]) > 100) {
		return message
			.send(`${bot.config.emojis.error} | Due to performance reasons, songs cannot go louder than 100.`);
	}

	bot.distube
		.setVolume(message, parseInt(args[0]))
		.then(async () => await message.replyT(`${bot.config.emojis.music} | I set the volume to ${args[0]}!`))
		.catch(async err => await message.replyT(`${bot.config.emojis.error} | Uh oh! An error occured.`));
}

module.exports = new cmd(execute, {
	description: `Sets the volume of the currently playing track.`,
	dirname: __dirname,
	usage: "",
	aliases: ["setvolume", "vol"],
	perms: ["EMBED_LINKS"],
});
