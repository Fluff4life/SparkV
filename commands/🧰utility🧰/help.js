const Discord = require("discord.js");
const fs = require("fs")
const pagination = require("discord.js-pagination")

var prefix = "^"

exports.run = async (Bot, msg, args) => {
  const pages = []

  const Commands = (Bot, category) => {
    return Bot.commands
      .filter(command => command.config.enabled & command.help.category === category)
      .map(command =>`\`${prefix}${command.help.name} ${command.help.usage}\`\n${command.help.description}`)
      .join("\n\n")
  }
  const CreatePage = (Bot, Message, Category) => {
    if (Category === ":red_square:"){
      return
    } else if (Category === "databases"){
      return
    }
  
    const NewEmbed = new Discord.MessageEmbed()
      .setTitle(Category.toUpperCase())
      .setDescription(Commands(Bot, Category))
      .setColor("#0099ff")
      .setThumbnail(Message.author.displayAvatarURL({ dynamic: true }))
  
    pages.push(NewEmbed)
}

  const data = await Bot.DataSchemas.Server.findOne({
    GuildID: msg.guild.id
  })
  
  if (data){
    prefix = data.Settings.Prefix
  } else if (!data){
    prefix = process.env.prefix
  }
  
  if (!args.length) {
     Bot.categories.map((cat) => CreatePage(Bot, msg, cat))
    
     pagination(msg, pages, ["⬅", "➡"])
  } else {
    const name = args[0].toLowerCase();
    const command = Bot.commands.get(name) || Bot.commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return msg.reply("That's not a valid command!");
    }

    const CommandHelpEmbed = new Discord.MessageEmbed()
      .setTitle(`${command.help.name}`)
      .setDescription(command.help.description)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .addField("**Aliases:**", `${command.config.aliases.join("\n")}`, true)
      .addField(
        "**Usage:**",
        `${prefix}${command.help.name} ${command.help.usage}`,
        true
      )
      .addField("**Guild Only:**", `${command.config.guild_only}`, true)
      .addField(
        "**Cooldown:**",
        `${command.help.cooldown || 3} second(s)`,
        true
      )
      .setFooter(
        `${prefix}Help to get a list of all commands.`,
        process.env.bot_logo
      )
      .setColor("#0099ff");

    return msg.channel.send(CommandHelpEmbed)
  }
},

exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["cmds", "commands", "h"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"]
  },

exports.help = {
    name: "Help",
    description: `I will displays all commands. Need help with a command? Do ${prefix}Help [command name]!`,
    usage: "[command]",
    category: "🧰utility🧰",
    cooldown: 10
  }