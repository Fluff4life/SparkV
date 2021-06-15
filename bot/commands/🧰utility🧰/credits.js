const Discord = require(`discord.js`);

exports.run = async (Bot, message) => {
    const NewEmbed = new Discord.MessageEmbed()
      .setTitle("Credits")
      .setDescription(`A list of people who have helped make Ch1llBlox the way it is now!`)
      .setColor(Bot.Config.Bot.Embed.Color)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
		    { name: '**Developers**', value: 'The people that have done the coding' },
        { name: "KingCh1ll#3616", value: 'Head Developer\n', inline: true }, //KingCh1ll
        { name: '@Qu1ckly_Frost#7454', value: 'Developer\n', inline: true }, //Qu1ckly_Frost
		    { name: '\u200B', value: '\u200B' },
        { name: '**Contributors**', value: 'People that have contributed other ways\n' },
        { name: '@2Lost4Discord#0001', value: 'Getting the bot verified!\n', inline: true }, //2Lost4Discord
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
