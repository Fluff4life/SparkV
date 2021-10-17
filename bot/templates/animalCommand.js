const Discord = require("discord.js");
const fetch = require("node-fetch");

const NewCommand = require("./command");

module.exports = class RedditCommand {
	constructor(sett) {
		this.settings = new NewCommand(
			null,
			Object.assign(
				{
					cooldown: 3 * 1000,
					slash: true,
					perms: ["EMBED_LINKS"],
				},
				sett,
			),
		).settings;
	}

	async run(bot, message, args, command) {
		let body = await fetch(`${this.settings.endpoint}`).then(response => response.json());

		if (body.message) {
			body = body.message;
		}

		if (body.file) {
			body = body.file;
		}

		if (body.image) {
			body = body.image;
		}

		if (body.url) {
			body = body.url;
		}

		const ImageEmbed = new Discord.MessageEmbed()
			.setTitle("😍 | Awwwww")
			.setImage(body)
			.setFooter(`Powered by ${this.settings.endpoint} • ${bot.config.embed.footer}`, bot.user.displayAvatarURL())
			.setColor(bot.config.embed.color);

		await message.replyT({
			embeds: [ImageEmbed],
		});
	}
};
