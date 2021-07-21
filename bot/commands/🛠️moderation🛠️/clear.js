const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  if (!args) {
    return message.reply(`${bot.config.bot.Emojis.error} | Please provide args.`).then(m => m.delete({ timeout: 5000 }))
  }

  try {
    if (args[0].toLowerCase() === `all`) {
      const VerificationEmbed = new Discord.MessageEmbed()
        .setTitle(`Confirmation Prompt`)
        .setDescription(`Are you sure you want to do this?\nYou will be deleting ***ALL*** the messages in this channel.`)
        .setFooter(`Canceling in 60 seconds if no emoji reacted. • ${bot.config.bot.Embed.Footer}`)

      const VerificationMessage = await message.reply(VerificationEmbed)
      const Emoji = await bot.PromptMessage(VerificationMessage, message.author, [bot.config.bot.Emojis.success, bot.config.bot.Emojis.error], 60)

      if (Emoji === bot.config.bot.Emojis.success) {
        // Yes
        message.delete()

        var messages = await message.channel.messages.fetch({
          limit: 100
        })

        messages = messages.array()

        if (messages.length > args[0]) {
          messages.length = parseInt(args[0], 10)
        }

        messages = messages.filter((msg) => !msg.pinned)
        ++args[0]
        
        message.delete();
        message.channel.bulkDelete(messages, true)
        message.reply(`Successfully cleared ${messages.length} messages!`).then(m => m.delete({ timeout: 5000 }))
      } else if (emoji === bot.config.bot.Emojis.error) {
        message.delete()

        message.reply(`${bot.config.bot.Emojis.error} | Clear canceled.`).then(m => m.delete({ timeout: 10000 }))
      }
    } else {
      const User = bot.GetMember(message, args)

      if (User) {
        if (isNaN(args[1])) {
          return message.reply(`${bot.config.bot.Emojis.error} | That's not a number.`).then(m => m.delete({ timeout: 5000 }))
        }
      } else {
        if (isNaN(args[0])) {
          return message.reply(`${bot.config.bot.Emojis.error} | That's not a number.`).then(m => m.delete({ timeout: 5000 }))
        }
      }

      var messages = await message.channel.messages.fetch({
        limit: args[1] || args[0]
      })

      messages = messages.array()

      if (User) {
        messages = messages.filter((msg) => msg.author.id === User.id)
      }

      if (messages.length > args[1]) {
        messages.length = parseInt(args[1], 10)
      }

      messages = messages.filter((msg) => !msg.pinned)
      ++args[1]
      message.delete();
      message.channel.bulkDelete(messages, true)

      if (User) {
        message.reply(`${bot.config.bot.Emojis.success} | Successfully cleared ${messages.length} messages from ${User.tag}!`).then(m => m.delete({ timeout: 5000 }))
      } else {
        message.reply(`${bot.config.bot.Emojis.success} | Successfully cleared ${messages.length} messages!`).then(m => m.delete({ timeout: 5000 }))
      }
    }
  } catch { } // Once in awhile we'll get a Unknown Message error. We prevent this by not logging that error.
},

  exports.config = {
    name: `Clear`,
    description: `I'll delete messages for you!`,
    aliases: [`purge`, `clr`],
    usage: `<all or number or user> <if user then number>`,
    category: `🛠️moderation🛠️`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`],
    member_permissions: [`MANAGE_MESSAGES`],
    enabled: true,
    cooldown: 5
  }
