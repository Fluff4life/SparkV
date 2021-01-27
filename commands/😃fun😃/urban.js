const Discord = require("discord.js");
const urban = require("urban");

exports.run = async (Bot, message, args) => {
  if (args.length < 1) {
    const ErrorEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid command usage!")
      .setDescription("Please provide a word to urban!")
      .setFooter(`Try using "${process.env.prefix}Urban [Word]"`);

    return await message.reply(ErrorEmbed);
  }

  let word = args.join(" ");

  urban(word).first(async json => {
    if (!json) {
      return message.reply("That word doesn't exist!");
    }

    const UrbanEmbed = new Discord.MessageEmbed()
      .setTitle(`Definition of ${json.word}`)
      .setDescription(json.definition)
      .setThumbnail("https://i.imgur.com/VFXr0ID.jpg")
      .addField(`Example`, json.example)
      .setURL(json.permalink)
      .setFooter(
        `👍${json.thumbs_up} 👎${json.thumbs_down} | 😃${json.author}`,
        process.env.bot_logo
      )
      .setColor("#0099ff");

    return await message.reply(UrbanEmbed);
  });
},

exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["definition"],
    mod_only: false
  },
  
  exports.help = {
    name: "Urban",
    description: "I will return an urban dictionary definition of a word!",
    usage: "[word]",
    category: "😃fun😃",
    cooldown: 3.5
  }