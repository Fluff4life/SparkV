const Discord = require(`discord.js`);

exports.run = async (Bot, message, Arguments) => {
  const User = Bot.GetMember(message, Arguments) || Bot.users.cache.get(Arguments[0]) || message.author

  if (Bot.Config.Debug.Enabled === true) {
    return
  }

  if (!Arguments || !Arguments[0]) {
    return message.lineReply(`Please provide text.`)
  }

  const canvacord = require(`canvacord`);

  Arguments = Arguments.join(` `)

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: `png`
  })

  const Image = await canvacord.Canvas.opinion(Avatar, Arguments)
  const Opinion = new Discord.MessageAttachment(Image, `opinion.png`)

  message.lineReplyNoMention(Opinion)
},

  exports.config = {
    name: `Opinion`,
    description: `lol`,
    aliases: [`nofact`],
    usage: `<text>`,
    category: `📷images📷`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 2
  }