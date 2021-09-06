const { MessageEmbed } = require("discord.js");

const pages = [];
const Commands = (bot, category) =>
  bot.commands
    .filter(command => command.config.enabled && command.config.category === category)
    .map(command => `\`^${command.config.name} ${command.config.usage}\`\n${command.config.description}`)
    .join(`\n\n`);
const CreatePage = async (bot, interaction, Category) => {
  if (Category === `👑Owner👑` && interaction.user.id !== process.env.OWNERID) {
    return;
  }

  const NewEmbed = new MessageEmbed()
    .setTitle(Category)
    .setDescription(Commands(bot, Category))
    .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
    .setAuthor(
      "Ch1llBlox Help",
      `https://cdn.discordapp.com/avatars/${interaction.message.author.id}/${interaction.message.author.avatar}.png?size=256`,
    )
    .setFooter(
      "Ch1llBlox - Making your Discord life easier!",
      `https://cdn.discordapp.com/avatars/${interaction.message.author.id}/${interaction.message.author.avatar}.png?size=256`,
    )
    .setColor(bot.config.bot.Embed.Color)
    .setTimestamp();

  pages.push(NewEmbed);
};

module.exports = {
  once: false,
  async execute(bot, interaction) {
    if (interaction.isCommand()) {
      return;
    }

    if (interaction.isSelectMenu()) {
      if (interaction.customId === "SelectHelpMenu") {
        bot.map(cat => CreatePage(bot, interaction, cat));

        await interaction.update({
          embeds: [pages.filter(p => p.title === interaction.values[0])[0]],
        });
      }
    }
  }
};
