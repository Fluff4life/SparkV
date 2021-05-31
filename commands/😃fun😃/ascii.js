const Discord = require(`discord.js`);

exports.run = async (Bot, message, Arguments) => {
  if (Bot.Config.Debug === true) {
    return
  }

  const figlet = require(`figlet`)

  if (!Arguments || !Arguments[0]){
    return message.lineReply(`Please provide text!`)
  }

  Arguments = Arguments.join(` `)

  figlet.text(Arguments, function(err, data){
    if (err){
      message.lineReplyNoMention(`Uh oh! Something went wrong.`)
      console.log(`Failed to figlet text: ` + err)

      return
    }

    if (data.length > 2000){
      return message.lineReply(`Please provide text shorter than 200 characters.`)
    }

    message.lineReplyNoMention(data)
  })
},
  
  exports.config = {
    name: `Ascii`,
    description: `I will change any text to ascii!`,
    aliases: [],
    usage: `<text>`,
    category: `😃fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `ADD_REACTIONS`],
    member_permissions: [],
    enabled: true,
    cooldown: 5
  }