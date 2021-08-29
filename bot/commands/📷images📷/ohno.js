const Discord = require("discord.js");

exports.run = async (bot, message, args, command, data) => {
    if (bot.config.Debug.Enabled === true) {
        return;
    }

    const canvacord = require("canvacord");

    args = args.join(" ");

    const Image = await canvacord.Canvas.ohno(args);
    const OhNo = new Discord.MessageAttachment(Image, "ohno.png");

    message.reply(OhNo);
};
exports.config = {
<<<<<<< HEAD
  name: "OhNo",
  description: "OH NO HE'S STUPID!",
  aliases: ["stupid"],
  usage: "<text>",
  category: "📷Images📷",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 2,
=======
    name: "OhNo",
    description: "OH NO HE'S STUPID!",
    aliases: ["stupid"],
    usage: "<text>",
    category: "📷Images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
