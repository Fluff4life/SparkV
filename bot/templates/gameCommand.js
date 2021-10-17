const discord = require("discord.js");
const akinator = require("discord.js-akinator");
const NewCommand = require("./command");

module.exports = class ModCommand {
	constructor(execute, sett) {
		this.execute = execute;
		this.settings = new NewCommand(execute, Object.assign({ cooldown: 60 * 1000 }, sett)).settings;
	}

	async run(bot, message, args, command, data) {
		if (this.settings.type === "together") {
			if (!message.member.voice.channel) {
				return message
					.replyT(`${bot.config.emojis.error} | You must be in a __**voice channel**__ to use this command!`);
			}

			bot.discordTogether
				.createTogetherCode(message.member.voice.channel.id, this.settings.gname)
				.then(async invite => await message.replyT(`${invite.code}`));
		} else if (this.settings.type === "game") {
			if (this.settings.gname === "akinator") {
				const gameTypes = ["animal", "character", "object"];

				let gameType;
				// The Type of Akinator Game to Play. ("animal", "character" or "object")

				if (args[0]) {
					if (gameTypes.includes(args[0].toLowerCase())) {
						gameType = args[0].toLowerCase();
					} else {
						return await message.replyT(`Invalid game type: \`${args[0]}\``);
					}
				} else {
					gameType = "character";
				}

				akinator(message, {
					gameType: gameType,
					useButtons: true,
					language: data.guild.languge
				});
			} else {
				await message.replyT(`Invalid game name: \`${this.settings.gname}\``);
			}
		} else {
			await message.replyT(`Invalid game type: \`${this.settings.type}\``);
		}

		if (this.execute) {
			return this.execute(bot, message, args, command, data);
		}
	}
};
