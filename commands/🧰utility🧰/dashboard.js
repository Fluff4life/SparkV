const Discord = require(`discord.js`);

exports.run = async (Bot, message) => {
  message.lineReplyNoMention(`${Bot.Config.Emojis.success} | Click the following link to view my dashboard! Link: https://ch1llblox.botdash.pro/`)
},

  exports.config = {
    name: `Dashboard`,
    description: `I'll send my dashboard!`,
    aliases: [`dash`],
    usage: ``,
    category: `🧰utility🧰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
  }