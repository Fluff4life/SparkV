const Discord = require("discord.js");
const request = require("node-fetch");

const cmd = require("../../templates/command");

async function execute(bot, message) {
	request("https://www.reddit.com/r/MemeEconomy/top/.json")
		.then(res => res.json())
		.then(async json => {
			const post = json.data.children[Math.floor(Math.random() * json.data.children.length)].data;

			if (post.title.length > 256) {
				const MemeEconomyEmbed = new Discord.MessageEmbed()
					.setTitle("Title too long")
					.setImage(post.url)
					.setURL(`https://www.reddit.com${post.permalink}`)
					.setFooter(
						`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} • ${bot.config.embed.footer}`,
						bot.user.displayAvatarURL(),
					)
					.setColor(bot.config.embed.color);

				await message.replyT({
					embeds: [MemeEconomyEmbed],
				});
			} else {
				const MemeEconomyEmbed = new Discord.MessageEmbed()
					.setTitle(post.title)
					.setImage(post.url)
					.setURL(`https://www.reddit.com${post.permalink}`)
					.setFooter(
						`👍${post.ups} | 💬${post.num_comments} | 😃u/${post.author} • ${bot.config.embed.footer}`,
						bot.user.displayAvatarURL(),
					)
					.setColor(bot.config.embed.color);

				await message.replyT({
					embeds: [MemeEconomyEmbed],
				});
			}
		});
}

module.exports = new cmd(execute, {
	description: "lol",
	dirname: __dirname,
	aliases: ["memeeconomy"],
	usage: ``,
});
