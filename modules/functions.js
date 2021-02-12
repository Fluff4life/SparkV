const { time } = require("console")
const Discord = require("discord.js")
const request = require("node-fetch")
const { validateID } = require("ytdl-core")

module.exports = async (bot) => {
  bot.MSToTime = function(ms){
    var days = Math.floor(ms / 86400000) // 24*60*60*1000
    var daysms = ms % 86400000 // 24*60*60*1000
    var hours = Math.floor(daysms / 3600000) // 60*60*1000
    var hoursms = ms % 3600000 // 60*60*1000
    var minutes = Math.floor(hoursms / 60000) // 60*1000
    var minutesms = ms % 60000 // 60*1000
    var sec = Math.floor(minutesms / 1000)
  
    let str = ""

    if (days){
      str = str + days + " days "
    }

    if (hours){
      str = str + hours + " hours " 
    }

    if (minutes){
      str = str + minutes + " minutes " 
    }

    if (sec){ 
      str = str + sec + " seconds"
    }
  
    return str
  }
  
  bot.GetUser = function(message, ToFind){
    ToFind = ToFind.toLowerCase()

    let Target = message.guild.members.get(toFind)

    if (!Target && message.mentions.members){
      Target = message.mentions.member.first()
    }

    if (!Target && ToFind){
      Target = message.guild.members.find(member => {
        return member.displayName.toLowerCase().includes(ToFind) || member.user.tag.toLowerCase().includes(toFind)
      })
    }

    if (!Target){
      Target = message.member
    }

    return Target
  }

  bot.PromptMessage = function(message, author, reactions, seconds){
    seconds = seconds * 1000

    for (const Reaction of reactions){
      await message.react(Reaction)
    }

    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id

    return message
      .awaitReactions(filter, { 
        max: 1,
        time: seconds
      })
      .then(collected => collected.first() && collected.first().emoji.name)
  }

  bot.GetUserFromMention = function(mention){
	  if (!mention) return;

  	if (mention.startsWith('<@') && mention.endsWith('>')) {
		  mention = mention.slice(2, -1);

		  if (mention.startsWith('!')) {
			  mention = mention.slice(1);
		  }

		  return client.users.cache.get(mention);
      }
  }

  bot.Debounce = function(func, wait, immediate){
    var timeout
  
    return function () {
      var context = this,
        args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  bot.Wait = async function(SecondsTime, Function){
    return await new Promise(_ => setTimeout(Function, SecondsTime * 1000));
  }

  bot.CheckPerm = function(message){
    if (message.author.id == process.env.owner){
      return true
    } else {
      if (process.env.Admins.includes(message.author.id)){
        return true
      }
      
      return false
    }
  }
}