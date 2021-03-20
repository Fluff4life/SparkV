const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const ID = Arguments[0]

  if (!ID || isNaN(ID)) {
    return message.channel.send("Please provide a valid message ID.")
  }

  const Giveaway = Bot.GiveawayManager.giveaways.find((giveaway) => giveaway.messageID === Arguments[0])

  if (!Giveaway) {
    return message.channel.send("I couldn't find a giveaway with that message ID.")
  }

  Bot.GiveawayManager.delete(Giveaway.messageID).then(() => {
    message.channel.send("Giveaway successfully deleted!")
  }).catch((err) => {
    console.error(err).then(() => {
      message.channel.send("An error occured with Ch1llBlox! Please try this command again.")
    })
  })
},

  exports.config = {
    name: "DeleteGiveaway",
    description: "Delete a giveaway. Requires the permision MANAGE_MESSAGES.",
    aliases: ["deleteg"],
    usage: "<MessageID>",
    category: "🎉giveaway🎉",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: ["MANAGE_MESSAGES"],
    enabled: true,
    cooldown: 10
  }