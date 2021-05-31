const Discord = require(`discord.js`);

const MemoryTypes = [
  `🍎`,
  `🥭`,
  `🥑`,
  `🍏`,
  `🍐`,
  `🍋`,
  `🍓`,
  `🍒`,
  `🍍`,
  `🍌`,
  `🍊`,
  `🍉`,
  `🍇`,
  `🍅`
]

const GenerateArray = (level) => {
  const Pick = MemoryTypes[Math.floor(Math.random() * 3)]
  const Array = []

  for (let i = 0; i < level; i++){
    Array.push(Pick[Math.floor(Math.random() *  Pick.length)])
  }

  return Array
}

exports.run = async (Bot, message, Arguments) => {
  if (!Arguments){
    return message.lineReply(`${Bot.Config.Emojis.error} | Next time, say how many directions you want to challenge yourself with.`)
  }

  if (Arguments[0] < 1 || Arguments[0] > 20){
    return message.lineReply(`${Bot.Config.Emojis.error} | You can only select between 1-20.`)
  }

  try {
    const Memorize = GenerateArray(Arguments[0])
    const MemorizeMessage = await message.lineReplyNoMention(Memorize.map(emoji => `${emoji}`).join(` `))

    await Bot.wait(25 * 1000)
    MemorizeMessage.edit(`⚡ Now, type what you saw.`)

    const MemorizeType = Memorize.join(` `)
    const Guess = await message.channel.awaitMessages(res => messages.author.id === res.author.id, {
      max: 1,
      time: 30 * 1000
    })

    if (!Guess.size){
      return MemorizeMessage.edit(`❔ Times up! The emojis were ${MemorizeType}.`)
    }

    if (answer !== MemorizeType){
      return MemorizeMessage.edit(`❗ Wrong! The emojis were ${MemorizeType}.`)
    }

    return MemorizeMessage.edit(`🎉 You won!`)
  } catch (err){
    console.error(err)
  }
},

  exports.config = {
    name: `Memory`,
    description: `Pratice your memory!`,
    aliases: [`memo`],
    usage: ``,
    category: `🎲games🎲`,
    bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`],
    member_permissions: [],
    enabled: true,
    cooldown: 60
  }