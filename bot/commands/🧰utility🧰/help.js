const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");

var prefix = `^`;

exports.run = async (bot, message, args, command, data) => {
  prefix = data.guild.prefix;

  const Selections = [];
  const CreateSelection = async (bot, message, Category) => {
    if (
      Category === `👑Owner👑` &&
      message.author.id !== process.env.OWNERID
    ) {
      return;
    }

    if (Category === "👑Owner👑") {
      Selections.push({
        label: Category,
        description: "These are owner only commands.",
        value: Category,
        emoji: "👑",
      });
    } else if (Category === "⚫Roblox⚫") {
      Selections.push({
        label: Category,
        description: "Intergrate your server with Roblox!",
        value: Category,
        emoji: "⚫",
      });
    } else if (Category === "🎲Games🎲") {
      Selections.push({
        label: Category,
        description: "Make your server more fun with our large ammount of games!",
        value: Category,
        emoji: "🎲",
      });
    } else if (Category === "🎵Music🎵") {
      Selections.push({
        label: Category,
        description: "Play music right from your Discord server. With no ads and at no added cost!",
        value: Category,
        emoji: "🎵",
      });
    } else if (Category === "🐶Animals🐶") {
      Selections.push({
        label: Category,
        description: "Look at animals doing cute things.",
        value: Category,
        emoji: "🐶",
      });
    } else if (Category === "💰Currency💰") {
      Selections.push({
        label: Category,
        description: "Make money, play games, gamble!",
        value: Category,
        emoji: "💰",
      });
    } else if (Category === "📷Images📷") {
      Selections.push({
        label: Category,
        description: "Make your server x2 the fun with our image commands!",
        value: Category,
        emoji: "📷",
      });
    } else if (Category === "🤵Administration🤵") {
      Selections.push({
        label: Category,
        description: "Admins in your server only. You can make giveaways for your server to interact with!",
        value: Category,
        emoji: "🤵",
      });
    } else if (Category === "🧰Utility🧰") {
      Selections.push({
        label: Category,
        description: "Utility commands. Not very good unless you find a calculator fun.",
        value: Category,
        emoji: "🧰",
      });
    } else if (Category === "😃Fun😃") {
      Selections.push({
        label: Category,
        description: "Make your server way more fun with our fun commands!",
        value: Category,
        emoji: "😃",
      });
    } else if (Category === "🛠️Moderation🛠️") {
      Selections.push({
        label: Category,
        description: "Commands for server moderators. Packed with everything one could need!",
        value: Category,
        emoji: "🛠️",
      });
    } else {
      Selections.push({
        label: Category,
        description: "Unknown description.",
        value: Category,
        emoji: "❓",
      });
    }
  };

  bot.categories.map(cat => CreateSelection(bot, message, cat));

  if (!args.length) {
    const NewEmbed = new MessageEmbed()
      .setTitle("Select a Category!")
      .setDescription("Select a category from tapping the selection box below.")
      .setAuthor("Ch1llBlox Help", bot.user.displayAvatarURL({ dynamic: true, format: "png" }))
      .setThumbnail(
        message.author.displayAvatarURL({
          dynamic: true,
          format: "png",
        }),
      )
      .setFooter(
        "Ch1llBlox - Making your Discord life easier!",
        bot.user.displayAvatarURL({ dynamic: true, format: "png" }),
      )
      .setColor(bot.config.bot.Embed.Color)
      .setTimestamp();

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("SelectHelpMenu")
        .setPlaceholder("Select a category to view it's commands.")
        .addOptions(Selections),
    );

    message.channel.send({
      embeds: [NewEmbed],
      components: [row],
    });
  } else {
    const name = args[0].toLowerCase();
    const command =
      bot.commands.get(name) ||
      bot.commands.find(c => c.aliases && c.aliases.includes(name));

    const CommandHelpEmbed = new MessageEmbed()
      .setTitle(`\`\`\`${prefix}${command.config.name} ${command.config.usage}\`\`\``)
      .setDescription(command.config.description)
      .setThumbnail(
        message.author.displayAvatarURL({
          dynamic: true,
          format: "gif",
        }),
      )
      .addField(`**ALIASES**`, `\`\`\`${command.config.aliases.join(`,\n`)}\`\`\``, true)
      .addField(`**CATEGORY**`, `\`\`\`${command.config.category}\`\`\``, true)
      .addField(`**COOLDOWN**`, `\`\`\`${command.config.cooldown || 3} second(s)\`\`\``, true)
      .setFooter(
        `${prefix}Help to get a list of all commands • ${bot.config.bot.Embed.Footer}`,
        bot.user.displayAvatarURL(),
      )
      .setColor(bot.config.bot.Embed.Color);

    return message.reply(CommandHelpEmbed);
  }
};

  exports.config = {
    name: `Help`,
    description: `I will displays all commands. Do ${prefix}Help [command name] for specific command information!`,
    aliases: [`cmds`, `commands`],
    usage: `<command>`,
    category: `🧰Utility🧰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `ADD_REACTIONS`],
    member_permissions: [],
    enabled: true,
    cooldown: 5,
  };
