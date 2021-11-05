const { Message, Interaction } = require("discord.js");
const translate = require("@vitalets/google-translate-api");

Interaction.prototype.translate = translateContent;
Message.prototype.translate = translateContent;

Message.prototype.replyT = async function(options) {
	if (typeof options === "string") {
		const newOptions = {
			content: options,
			allowedMentions: {
				repliedUser: false
			}
		};

		options = newOptions;
	}

	if (options.content) {
		// Native languge.
		if (this.guild.data.language === "en") {
			return this.reply({
				content: options.content,
				allowedMentions: {
					repliedUser: false
				}
			});
		}

		// Can translate string.
		const cache = await this.client.redis.getAsync(`${options.content}-${this.guild.data.language}`).then(res => JSON.parse(res));
		let translation;

		if (cache) {
			translation = cache;
		} else {
			translation = await this.translate(options.content);

			this.client.redis.setAsync(`${options.content}-${this.guild.data.language}`, JSON.stringify(translation), "EX", 15 * 60);
		}

		this.reply({
			content: translation,
			allowedMentions: {
				repliedUser: false
			}
		});
	} else {
		// Cannot do anything.
		this.reply(options);
	}
};
Interaction.prototype.replyT = this.replyT;

async function translateContent(content) {
	// Native languge
	if (this.guild.data.language === "en") {
		return content;
	}

	const cache = await this.client.redis.getAsync(`${content}-${this.guild.data.language}`).then(res => JSON.parse(res));
	let translation;

	if (cache) {
		translation = cache;
	} else {
		let content1, content2;

		if (content.includes(" | ")) {
			content1 = content.split(" | ")[0];
			content2 = content.split(" | ")[1];
		}

		await translate(content2, { to: this.guild.data.language }).then(res => {
			if (content.includes(" | ")) {
				translation = `${content1} | ${res.text}`;
			} else {
				translation = res.text;
			}
		}).catch(err => console.error(err));

		this.client.redis.setAsync(`${content}-${this.guild.data.language}`, JSON.stringify(translation), "EX", 15 * 60);
	}

	return translation;
}