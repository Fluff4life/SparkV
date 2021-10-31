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

	bot.distube
		.shuffle(message)
		.then(async () => await message.replyT(`${bot.config.emojis.music} | Okay, I'll shuffle the queue.`))
		.catch(async err => await message.replyT(`${bot.config.emojis.error} | Uh oh! An error occured.`));
}

module.exports = new cmd(execute, {
	description: `Shuffles the queue.`,
	dirname: __dirname,
	usage: "",
	aliases: ["shufflequeue", "shuffleq", "squeue"],
	perms: ["EMBED_LINKS"],
});
