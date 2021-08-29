const { MessageEmbed } = require("discord.js");

const pages = [];
const Commands = (bot, category) =>
<<<<<<< HEAD
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
=======
    bot.commands
        .filter(
            command =>
                command.config.enabled && command.config.category === category
        )
        .map(
            command =>
                `\`^${command.config.name} ${command.config.usage}\`\n${command.config.description}`
        )
        .join(`\n\n`);
const CreatePage = async (bot, interaction, Category) => {
    if (
        Category === `👑Owner👑` &&
        interaction.user.id !== process.env.OWNERID
    ) {
        return;
    }

    const NewEmbed = new MessageEmbed()
        .setTitle(Category)
        .setDescription(Commands(bot, Category))
        .setThumbnail(
            `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`
        )
        .setAuthor(
            "Ch1llBlox Help",
            `https://cdn.discordapp.com/avatars/${interaction.message.author.id}/${interaction.message.author.avatar}.png?size=256`
        )
        .setFooter(
            "Ch1llBlox - Making your Discord life easier!",
            `https://cdn.discordapp.com/avatars/${interaction.message.author.id}/${interaction.message.author.avatar}.png?size=256`
        )
        .setColor(bot.config.bot.Embed.Color)
        .setTimestamp();
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

  pages.push(NewEmbed);
};

exports.run = async (bot, interaction) => {
  if (interaction.isCommand()) {
    return;
  }

  if (interaction.isSelectMenu()) {
    if (interaction.customId === "SelectHelpMenu") {
      bot.categories.map(cat => CreatePage(bot, interaction, cat));

<<<<<<< HEAD
      await interaction.update({
        embeds: [pages.filter(p => p.title === interaction.values[0])[0]],
      });
=======
            await interaction.update({
                embeds: [
                    pages.filter(p => p.title === interaction.values[0])[0],
                ],
            });
        }
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
    }
  }
};
