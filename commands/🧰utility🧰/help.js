const Discord = require("discord.js");

(exports.run = async (Bot, msg, args) => {
  const Commands = category => {
    return Bot.commands
      .filter(command => command.help.category === category)
      .map(
        command =>
          `\`${process.env.prefix}${command.help.name}\`: *${command.help.description}*`
      )
      .join("\n");
  };

  if (!args.length) {
    const Description = Bot.categories
      .map(cat => "\n" + `__***${cat.toUpperCase()}***__ \n${Commands(cat)}`)
      .join("\n");

    const HelpEmbend = new Discord.MessageEmbed()
      .setTitle(":robot: Commands :robot:")
      .setDescription(Description)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .setFooter(
        `${process.env.prefix}Help [command] to get infomation on a specific command.`,
        process.env.bot_logo
      )
      .setColor("#0099ff");

    return msg.author
      .send(HelpEmbend)
      .then(() => {
        if (msg.channel.type === "dm") {
          return;
        } else {
          msg.react("📩")
        }
      })
      .catch(err => {
        console.error(
          `Failed to send help DM to ${msg.author.tag}.\n`,
          err
        );
        msg.reply(HelpEmbend);
      });
  } else {
    const name = args[0].toLowerCase();
    const command =
      Bot.commands.get(name) ||
      Bot.commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return msg.reply("That's not a valid command!");
    }

    const CommandHelpEmbend = new Discord.MessageEmbed()
      .setTitle(`${command.help.name}`)
      .setDescription(command.help.description)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .addField("**Aliases:**", `${command.config.aliases.join("\n")}`, true)
      .addField(
        "**Usage:**",
        `${process.env.prefix}${command.help.name} ${command.help.usage}`,
        true
      )
      .addField("**Guild Only:**", `${command.config.guild_only}`, true)
      .addField(
        "**Cooldown:**",
        `${command.help.cooldown || 3} second(s)`,
        true
      )
      .setFooter(
        `${process.env.prefix}Help to get a list of all commands.`,
        process.env.bot_logo
      )
      .setColor("#0099ff");

    return msg.author
      .send(CommandHelpEmbend)
      .then(() => {
        if (msg.channel.type === "dm") {
          return;
        }

        msg.react("📩")
      })
      .catch(err => {
        console.error(
          `Failed to send command help DM to ${msg.author.tag}.\n`,
          err
        );
        msg.reply(CommandHelpEmbend);
      });
  }
}),
  (exports.config = {
    enabled: true,
    guild_only: false,
    mod_only: false,
    aliases: ["commands", "h", "cs"]
  }),
  (exports.help = {
    name: "Help",
    description: `I will displays all commands. Need help with a command? Do ${process.env.prefix}Help [command name]!`,
    usage: "[command]",
    category: "🧰utility🧰",
    cooldown: 10
  });
