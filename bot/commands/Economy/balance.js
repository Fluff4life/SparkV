const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
	let User = await bot.functions.fetchUser(args[0]);
	let UserData;

	if (User) {
		UserData = await bot.database.getUser(User.id);
	} else {
		User = message.author;
		UserData = data.user;
	}

	const BalanceEmbed = new Discord.MessageEmbed()
		.setTitle(`**${User.tag}'s Balance**`)
		.setDescription(
			`Wallet: ⏣${bot.functions.formatNumber(UserData.money.balance)}\nBank: ⏣${bot.functions.formatNumber(
				UserData.money.bank,
			)}/${bot.functions.formatNumber(UserData.money.bankMax)}\nNet Worth: ⏣${bot.functions.formatNumber(
				UserData.money.bank + UserData.money.balance,
			)}`,
		)
		.setColor(bot.config.embed.color)
		.setTimestamp();

	await message.reply({
		embeds: [BalanceEmbed],
	});
}

module.exports = new cmd(execute, {
	description: `View your balance.`,
	dirname: __dirname,
	aliases: ["bal"],
	usage: `<optional user>`,
});
