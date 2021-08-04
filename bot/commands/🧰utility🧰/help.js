const Discord = require(`discord.js`);
const fs = require(`fs`);
// Const Buttons = require("discord-buttons")
// const ButtonPages = require("discord-embeds-pages-buttons")
const EasyPages = require("discordeasypages");

var prefix = `^`;

exports.run = async (bot, message, args, command, data) => {
  prefix = await bot.dashboard.getVal(message.guild.id, `Prefix`);

  const pages = [];
  const Commands = (bot, category) =>
    bot.commands
      .filter(command => command.config.enabled && command.config.category === category)
      .map(command => `\`${prefix}${command.config.name} ${command.config.usage}\`\n${command.config.description}`)
      .join(`\n\n`);

  const CreatePage = async (bot, message, Category) => {
    if (Category === `👑owner👑` && message.author.id !== process.env.OwnerID) {
      return;
    }

    const NewEmbed = new Discord.MessageEmbed()
      .setTitle(Category.toUpperCase())
      .setDescription(Commands(bot, Category))
      .setColor(bot.config.bot.Embed.Color)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "gif" }));

    pages.push(NewEmbed);
  };

  if (!args.length) {
    bot.categories.map(cat => CreatePage(bot, message, cat));

    EasyPages(message, pages, ["⬅", "➡"]);
  } else {
    const name = args[0].toLowerCase();
    const command = bot.commands.get(name) || bot.commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply(`${bot.config.bot.Emojis.error} | That command doesn't exist or no longer exists!`);
    }

    const CommandHelpEmbed = new Discord.MessageEmbed()
      .setTitle(`\`\`\`${prefix}${command.config.name} ${command.config.usage}\`\`\``)
      .setDescription(command.config.description)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "gif" }))
      .addField(`**ALIASES**`, `\`\`\`${command.config.aliases.join(`,\n`)}\`\`\``, true)
      .addField(`**CATEGORY**`, `\`\`\`${command.config.category}\`\`\``, true)
      .addField(`**COOLDOWN**`, `\`\`\`${command.config.cooldown || 3} second(s)\`\`\``, true)
      .setFooter(
        `${prefix}Help to get a list of all commands • ${bot.config.bot.Embed.Footer}`,
        bot.user.displayAvatarURL()
      )
      .setColor(bot.config.bot.Embed.Color);

    return message.reply(CommandHelpEmbed);
  }
},

  exports.config = {
    name: `Help`,
    description: `I will displays all commands. Do ${prefix}Help [command name] for specific command information!`,
    aliases: [`cmds`, `commands`],
    usage: `<command>`,
    category: `🧰utility🧰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `ADD_REACTIONS`],
    member_permissions: [],
    enabled: true,
    cooldown: 5
};
