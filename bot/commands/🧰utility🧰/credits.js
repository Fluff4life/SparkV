const Discord = require(`discord.js`);

const Credits = [
    {
        name: "**🛠 | Developers**",
        value: "The people who made Ch1llBlox!\n**KingCh1ll** - Head Developer\n**Qu1ckly_Frost** - Developer",
        inline: true,
    },
    {
        name: "**✨ | Contributors**",
        value: "People that have contributed to Ch1llBlox.\n**2Lost4Discord** - Getting the bot verified.",
        inline: true,
    },
];

(exports.run = async (bot, message) => {
<<<<<<< HEAD
  const NewEmbed = new Discord.MessageEmbed()
    .setTitle("Credits")
    .setDescription(`Here's the list of people who've helped Ch1llBlox on his path to success!`)
    .setColor(bot.config.bot.Embed.Color)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "gif" }))
    .addFields(Credits);

  return message.reply(NewEmbed);
}),
  (exports.config = {
    name: `Credits`,
    description: `Look at everyone who helped make Ch1llBlox!`,
    aliases: [],
    usage: ``,
    category: `🧰Utility🧰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5,
  });
=======
    const NewEmbed = new Discord.MessageEmbed()
        .setTitle("Credits")
        .setDescription(
            `Here's the list of people who've helped Ch1llBlox on his path to success!`
        )
        .setColor(bot.config.bot.Embed.Color)
        .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true, format: "gif" })
        )
        .addFields(Credits);

    return message.reply(NewEmbed);
}),
    (exports.config = {
        name: `Credits`,
        description: `Look at everyone who helped make Ch1llBlox!`,
        aliases: [],
        usage: ``,
        category: `🧰Utility🧰`,
        bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
        member_permissions: [],
        enabled: true,
        cooldown: 1.5,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
