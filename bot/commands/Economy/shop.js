const Discord = require(`discord.js`);
const easypages = require("discordeasypages");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
	const User = await bot.functions.GetMember(message, args);
	const pages = [];

	bot.shop.each(item => {
		const itemEmbed = new Discord.MessageEmbed()
			.setTitle(`Shop - ${item.name}`)
			.setDescription(item.desc || "Well that's odd... this item doesn't have a description.")
			.addField(`IDs`, item.ids.join(", "), true)
			.addField("Price", item.sale ? `⏣ ${item.price}` : `This item isn't for sale.`, true)
			.setColor("BLUE")
			.setTimestamp();

		pages.push(itemEmbed);
	});

	easypages(message, pages);
}

module.exports = new cmd(execute, {
	description: `Give someone some data.user.money.balance!`,
	dirname: __dirname,
	usage: `<user>`,
	aliases: [],
	perms: ["EMBED_LINKS"],
});
