const Discord = require("discord.js");
const ms = require("ms")

exports.run = async (Bot, message, Arguments) => {
  const Channel = message.mentions.channels.first()
  const Duration = Arguments[1]
  const Winners = Arguments[2]
  const Prize = Arguments.slice(3).join(" ")

  if (!Channel){
    return message.lineReplyNoMention("Please provide a valid channel.")
  }

  if (!Duration || isNaN(ms(Duration))){
    return message.lineReplyNoMention("Please provide a valid duration.")
  }

  if (!Winners || isNaN(Winners) || (parseInt(Winners) <= 0)){
    return message.lineReplyNoMention("Please provide a valid number of winners!")
  }

  if (!Prize){
    return message.lineReplyNoMention("Why do you want to give away nothing lol.")
  }

  Bot.GiveawayManager.start(Channel, {
    time: ms(Duration),
    prize: Prize,
    winnerCount: Winners,
    hostedBy: message.author,

    messages: {
      giveaway: "⚡ New Giveaway! ⚡",
      giveawayEnded: "🎉 Giveaway Ended 🎉",
      timeRemaining: "⏳ Time remaining: **{duration}**! ⏳",
      inviteToParticipate: "🎉 React to enter! 🎉",
      winMessage: "⚡ Congrats, {winners}! You won just **{prize}**! ⚡",
      noWinner: "❓ Couldn't determine a winner. Please do ^Reroll.",
      hostedBy: "❔ Giveaway hosted by {user}!",
      embedFooter: "Thanks for using Ch1llBlox!",
      winners: "winner(s)",
      endedAt: "Ends at",
      units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
          pluralS: false
      }
    }
  })

  message.lineReplyNoMention(`Giveaway starting in ${Channel}!`)
},

exports.config = {
  name: "StartGiveaway",
  description: "Starts a giveaway. Requires the permision MANAGE_MESSAGES.",
  aliases: ["startg"],
  usage: "<channel> <duration> <winners> <prize>",
  category: "🎉giveaway🎉",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: ["MANAGE_MESSAGES"],
  enabled: true,
  cooldown: 10
}