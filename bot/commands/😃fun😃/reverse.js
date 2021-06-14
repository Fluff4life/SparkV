const Discord = require(`discord.js`);

exports.run = async (Bot, message, Arguments) => {
  if (!Arguments){
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | Bruh I cannot reverse no text lol.`)
  }

  message.lineReply(Arguments.join(` `).split(``).reverse().join(``))
},
  
  exports.config = {
    name: `Reverse`,
    description: `I will reverse any text you give me lol.`,
    aliases: [`talk`],
    usage: `<message>`,
    category: `😃fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`],
    member_permissions: [],
    enabled: true,
    cooldown: 5
  }