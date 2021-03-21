const Discord = require("discord.js");
const fs = require("fs")
const discordeasypages = require("discordeasypages")

var prefix = "^"

exports.run = async (Bot, message, args) => {
  const pages = []

  const Commands = (Bot, category) => {
    return Bot.commands
      .filter(command => command.config.enabled && command.config.category === category)
      .map(command =>`\`${prefix}${command.config.name} ${command.config.usage}\`\n${command.config.description}`)
      .join("\n\n")
  }
  const CreatePage = (Bot, Message, Category) => {
    if (Category === "👑owner👑" && message.author.id !== process.env.OwnerID){
      return
    }

    const NewEmbed = new Discord.MessageEmbed()
      .setTitle(Category.toUpperCase())
      .setDescription(Commands(Bot, Category))
      .setColor(Bot.Config.Embed.EmbedColor)
      .setThumbnail(Message.author.displayAvatarURL({ dynamic: true }))
  
    pages.push(NewEmbed)
}

  const Prefix = await Bot.Database.get(`ServerData_${message.guild.id}.Prefix`)

  if (Prefix){
    prefix = Prefix
  } else {
    prefix = Bot.Config.Bot.prefix
  }
  
  if (!args.length) {
    Bot.categories.map((cat) => CreatePage(Bot, message, cat))
    
    discordeasypages(message, pages, ["⏪", "⏩", "🗑"])
  } else {
    const name = args[0].toLowerCase();
    const command = Bot.commands.get(name) || Bot.commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that command doesn't exist or no longer exists!");
    }

    const CommandHelpEmbed = new Discord.MessageEmbed()
      .setTitle(`\`\`\`${prefix}${command.config.name} ${command.config.usage}\`\`\``)
      .setDescription(command.config.description)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addField("**ALIASES**", `\`\`\`${command.config.aliases.join(",\n")}\`\`\``, true)
      .addField("**CATEGORY**", `\`\`\`${command.config.category}\`\`\``, true)
      .addField("**COOLDOWN**", `\`\`\`${command.config.cooldown || 3} second(s)\`\`\``, true)
      .setFooter(`${prefix}Help to get a list of all commands.`, Bot.user.displayAvatarURL())
      .setColor(Bot.Config.Embed.EmbedColor);

    return message.channel.send(CommandHelpEmbed)
  }
},

  exports.config = {
    name: "Help",
    description: `I will displays all commands. Do ${prefix}Help [command name] for specific command information!`,
    aliases: ["cmds", "commands"],
    usage: "<command>",
    category: "🧰utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
    member_permissions: [],
    enabled: true,
    cooldown: 5
  }