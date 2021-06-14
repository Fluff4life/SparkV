const Discord = require(`discord.js`);

exports.run = async (Bot, message) => {
    const NewEmbed = new Discord.MessageEmbed()
      .setTitle("Credits")
      .setDescription(`A list of people who have helped make Ch1llBlox the way it is now!`)
      .setColor(Bot.Config.Bot.Embed.Color)
      .setThumbnail(Message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
		    { name: '**Developers**', value: 'The people that have done the coding' },
        { name: '<@571811686617710592>', value: 'Head Developer', inline: true }, //KingCh1ll
        { name: '<@506567917220003850>', value: 'Developer', inline: true }, //Qu1ckly_Frost
		    { name: '\u200B', value: '\u200B' },
        { name: '**Contributors**', value: 'People that have contributed other ways' },
        { name: '<@590423866434650113>', value: 'Getting the bot verified!', inline: true }, //2Lost4Discord
		    { name: '<@576933657516834858>', value: '** **', inline: true }, //Braxton
		    //{ name: 'name', value: 'value', inline: true },
    	)
    
    return message.lineReplyNoMention(NewEmbed)
},

  exports.config = {
    name: `Credits`,
    description: `Look at everyone who helped make Ch1llBlox!`,
    aliases: [],
    usage: ``,
    category: `🧰utility🧰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
  }
