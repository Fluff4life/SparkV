const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");

module.exports = {
  once: false,
  async execute(bot, interaction) {
    if (interaction.isCommand()) {
      const command = bot.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(bot, interaction);
      } catch (error) {
        console.error(error);

        await interaction.reply({
          content: "❌ | There was an error while executing this command!",
          ephemeral: true,
        });
      }
    } else if (interaction.isSelectMenu()) {
      if (interaction.customId === "SelectHelpMenu") {
        const pages = [];
        const Selections = [];

        const CreatePage = async (bot, interaction, Category) => {
          if (Category.name.toLowerCase().includes("owner") && interaction.user.id !== bot.config.ownerID) {
            return;
          }

          const NewEmbed = new MessageEmbed()
            .setTitle(Category.name)
            .setDescription(
              bot.commands
                .filter(command => command.settings.enabled && command.category === Category.name)
                .map(
                  command => `\`^${command.settings.name} ${command.settings.usage}\`\n${command.settings.description}`,
                )
                .join(`\n\n`),
            )
            .setThumbnail(
              `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`,
            )
            .setAuthor(
              "SparkV Help",
              `https://cdn.discordapp.com/avatars/${interaction.message.author.id}/${interaction.message.author.avatar}.png?size=256`,
            )
            .setFooter(
              "SparkV - Making your Discord life easier!",
              `https://cdn.discordapp.com/avatars/${interaction.message.author.id}/${interaction.message.author.avatar}.png?size=256`,
            )
            .setColor(bot.config.embed.color)
            .setTimestamp();

          pages.push(NewEmbed);
        };

        const CreateSelection = async (interaction, Category) => {
          if (Category.name.toLowerCase().includes("owner") && interaction.message.author.id !== bot.config.ownerID) {
            return;
          }

          Selections.push({
            label: Category.name,
            description: Category.description,
            value: Category.name,
            emoji: Category.emoji ? Category.emoji : null,
          });
        };

        bot.categories.map(cat => CreatePage(bot, interaction, cat));
        bot.categories.map(cat => CreateSelection(interaction, cat));

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
          .setURL("https://top.gg/bot/763126208149585961")
          .setLabel("Vote for me!")
          .setStyle("LINK");

        await interaction.update({
          embeds: [pages.filter(p => p.title === interaction.values[0])[0]],
          components: [
            new MessageActionRow().addComponents(CatSelect),
            new MessageActionRow().addComponents(InviteButton, SupportButton, VoteButton),
          ],
        });
      }
    }
  },
};
