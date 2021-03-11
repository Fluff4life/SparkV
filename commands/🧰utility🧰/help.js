const Discord = require("discord.js");
const fs = require("fs")
const pagination = require("discord.js-pagination")

var prefix = "^"

exports.run = async (Bot, msg, args) => {
  const pages = []

  const Commands = (Bot, category) => {
    return Bot.commands
      .filter(command => command.config.enabled & command.config.category === category)
      .map(command =>`\`${prefix}${command.config.name} ${command.config.usage}\`\n${command.config.description}`)
      .join("\n\n")
  }
  const CreatePage = (Bot, Message, Category) => {
    const NewEmbed = new Discord.MessageEmbed()
      .setTitle(Category.toUpperCase())
      .setDescription(Commands(Bot, Category))
      .setColor(process.env.EmbedColor)
      .setThumbnail(Message.author.displayAvatarURL({ dynamic: true }))
  
    pages.push(NewEmbed)
}

  const Prefix = await Bot.Database.get(`ServerData_${msg.guild.id}.Prefix`)

  if (Prefix){
    prefix = Prefix
  } else {
    prefix = process.env.prefix
  }
  
  if (!args.length) {
     Bot.categories.map((cat) => CreatePage(Bot, msg, cat))
    
     pagination(msg, pages, ["⬅", "➡"])
  } else {
    const name = args[0].toLowerCase();
    const command = Bot.commands.get(name) || Bot.commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return msg.reply("that command doesn't exist or no longer exists!");
    }

    const CommandHelpEmbed = new Discord.MessageEmbed()
      .setTitle(`\`\`\`${prefix}${command.config.name} ${command.config.usage}\`\`\``)
      .setDescription(command.config.description)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .addField("**ALIASES**", `\`\`\`${command.config.aliases.join(",\n")}\`\`\``, true)
      .addField("**CATEGORY**", `\`\`\`${command.config.category}\`\`\``, true)
      .addField("**COOLDOWN**", `\`\`\`${command.config.cooldown || 3} second(s)\`\`\``, true)
      .setFooter(`${prefix}Help to get a list of all commands.`, Bot.user.AvatarURL)
      .setColor(process.env.EmbedColor);

    return msg.channel.send(CommandHelpEmbed)
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