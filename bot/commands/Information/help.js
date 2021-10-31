const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
	const prefix = data.guild.prefix;
	const Selections = [];

	const CreateSelection = async (message, Category) => {
		if (Category.name.toLowerCase().includes("owner") && message.author.id !== bot.config.ownerID) {
			return;
		}

		Selections.push({
			label: Category.name,
			description: Category.description,
			value: Category.name,
			emoji: Category.emoji ? Category.emoji : null,
		});
	};

	bot.categories.map(cat => CreateSelection(message, cat));

	if (!args[0]) {
		const NewEmbed = new MessageEmbed()
			.setTitle("Select a Category!")
			.setDescription("Select a category from tapping the selection box below.")
			.setAuthor("SparkV Help", bot.user.displayAvatarURL({ dynamic: true, format: "png" }))
			.setThumbnail(
				message.author.displayAvatarURL({
					dynamic: true,
					format: "png",
				}),
			)
			.setFooter(
				"SparkV - Making your Discord life easier!",
				bot.user.displayAvatarURL({ dynamic: true, format: "png" }),
			)
			.setColor(bot.config.embed.color)
			.setTimestamp();

		const CatSelect = new MessageSelectMenu()
			.setCustomId("SelectHelpMenu")
			.setPlaceholder("Select a category to view it's commands.")
			.addOptions(Selections);

		const InviteButton = new MessageButton().setURL(bot.config.bot_invite).setLabel("Bot Invite")
			.setStyle("LINK");

		const SupportButton = new MessageButton()
			.setURL(bot.config.support.invite)
			.setLabel("Support Invite")
			.setStyle("LINK");

		const VoteButton = new MessageButton()
			.setURL("https://top.gg/bot/874294905034407966")
			.setLabel("Vote for me!")
			.setStyle("LINK");

		const row = new MessageActionRow().addComponents(CatSelect);
		const row2 = new MessageActionRow().addComponents(InviteButton, SupportButton, VoteButton);

		message.replyT({
			embeds: [NewEmbed],
			components: [row, row2],
		});
	} else {
		const name = args[0].toLowerCase();
		const cmd = bot.commands.get(name) || bot.commands.find(c => c.settings.aliases && c.settings.aliases.includes(name));

		const CommandHelpEmbed = new MessageEmbed()
			.setTitle(`\`\`\`${command.settings.slash === true ? "/" : data.guild.prefix}${command.settings.name} ${command.settings.usage}\`\`\``)
			.setDescription(command.settings.description)
			.setThumbnail(
				message.author.displayAvatarURL({
					dynamic: true,
					format: "gif",
				}),
			)
			.addField(`**ALIASES**`, `\`\`\`${command.settings.aliases.join(`,\n`)}\`\`\``, true)
			.addField(`**CATEGORY**`, `\`\`\`${command.settings.category}\`\`\``, true)
			.addField(`**COOLDOWN**`, `\`\`\`${command.settings.cooldown || 3} second(s)\`\`\``, true)
			.setFooter(
				`${data.guild.prefix}Help to get a list of all commands • ${bot.config.embed.footer}`,
				bot.user.displayAvatarURL(),
			)
			.setColor(bot.config.embed.color);

		return await message.reply({
			embeds: [CommandHelpEmbed],
		});
	}
}

module.exports = new cmd(execute, {
	description: `View SparkV's 100+ commands.`,
	aliases: [`cmds`, `commands`, "vote"],
	usage: `<command>`,
	dirname: __dirname,
});
