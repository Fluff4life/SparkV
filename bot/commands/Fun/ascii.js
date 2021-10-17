const Discord = require(`discord.js`);
const figlet = require(`figlet`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
	if (!args || !args[0]) {
		return await message.replyT(`Please provide text!`);
	}

	args = args.join(` `);

	figlet.text(args, async (err, data) => {
		if (err) {
			console.log(`Failed to figlet text: ${err}`);

			return await message.replyT(`Uh oh! Something went wrong.`);
		}

		if (data.length > 1800) {
			return await message.replyT(`Please provide text shorter than 200 characters.`);
		}

		await message.replyT(`\`\`\`${data}\`\`\``);
	});
}

module.exports = new cmd(execute, {
	description: `I will change any text to ascii!`,
	dirname: __dirname,
	aliases: [],
	usage: `<text>`,
});
