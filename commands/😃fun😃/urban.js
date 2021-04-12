const Discord = require("discord.js");
const urban = require("urban");

exports.run = async (Bot, message, args) => {
  if (args.length < 1) {
    const ErrorEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid command usage!")
      .setDescription("Please provide a word to urban!")
      .setFooter(`Try ^Urban [Word] • ${Bot.Config.Embed.EmbedFooter}`);

    return await message.channel.send(ErrorEmbed).then(m => m.delete({ timeout: 5000 }))
  }

  let word = args.join(" ");

  urban(word).first(async json => {
    if (!json) {
      return message.channel.send("That word doesn't exist!").then(m => m.delete({ timeout: 5000 }))
    }

    const UrbanEmbed = new Discord.MessageEmbed()
      .setTitle(`Definition of ${json.word}`)
      .setDescription(json.definition)
      .setThumbnail("https://i.imgur.com/VFXr0ID.jpg")
      .addField(`Example`, json.example)
      .setURL(json.permalink)
      .setFooter(`👍${json.thumbs_up} 👎${json.thumbs_down} | 😃${json.author} • ${Bot.Config.Embed.EmbedFooter}`, Bot.user.displayAvatarURL())
      .setColor(Bot.Config.Embed.EmbedColor);

    return await message.channel.send(UrbanEmbed);
  });
},

  exports.config = {
    name: "Urban",
    description: "I will return an urban dictionary definition of a word!",
    aliases: ["thought"],
    usage: "<word>",
    category: "😃fun😃",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 3
  }