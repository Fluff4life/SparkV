const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!Arguments) {
    return message.channel.send("Please provide ").then(m => m.delete({ timeout: 5000 }))
  }

  if (Arguments[0].toLowerCase() === "all") {
    const VerificationEmbed = new Discord.MessageEmbed()
      .setTitle("Convermination Prompt")
      .setDescription("Are you sure you want to do this?")
      .setFooter("Canceling in 60 seconds if no emoji reacted.")

    const VerificationMessage = await message.channel.send(VerificationEmbed)
    const Emoji = await Bot.PromptMessage(VerificationMessage, message.author, ["✅", "❌"], 60)

    if (Emoji === "✅") {
      // Yes
      message.delete()

      var messages = await message.channel.messages.fetch({
        limit: 100
      })

      messages = messages.array()

      if (messages.length > Arguments[0]) {
        messages.length = parseInt(Arguments[0], 10)
      }

      messages = messages.filter((msg) => !msg.pinned)
      ++Arguments[0]

      message.channel.bulkDelete(messages, true)
      message.channel.send(`Successfully cleared ${messages.length} messages!`).then(m => m.delete({ timeout: 5000 }))
    } else if (emoji === "❌") {
      message.delete()

      message.channel.send("❌Clear canceled.").then(m => m.delete({ timeout: 10000 }))
    }
  } else {
    const User = message.mentions.users.first()

    if (User){
      if (isNaN(Arguments[1])){
        return message.channel.send("That's not a number.").then(m => m.delete({ timeout: 5000 }))
      }
    } else {
      if (isNaN(Arguments[0])){
        return message.channel.send("That's not a number.").then(m => m.delete({ timeout: 5000 }))
      }
    }

    var messages = await message.channel.messages.fetch({
      limit: 100
    })

    messages = messages.array()

    if (User) {
      messages = messages.filter((msg) => msg.author.id === User.id)
    }

    if (messages.length > Arguments[1]) {
      messages.length = parseInt(Arguments[1], 10)
    }

    messages = messages.filter((msg) => !msg.pinned)
    ++Arguments[1]

    message.channel.bulkDelete(messages, true)

    if (User) {
      message.channel.send(`Successfully cleared ${messages.length} messages from ${User.tag}!`).then(m => m.delete({ timeout: 5000 }))
    } else {
      message.channel.send(`Successfully cleared ${messages.length} messages!`).then(m => m.delete({ timeout: 5000 }))
    }
  }
},

  exports.config = {
    name: "Clear",
    description: "I can delete messages for you so you don't have to spend a while deleting them :)",
    aliases: ["purge", "clr"],
    usage: "<all or number or user> <if user then number>",
    category: "🛠️moderation🛠️",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES"],
    member_permissions: ["MANAGE_MESSAGES"],
    enabled: true,
    cooldown: 5
  }