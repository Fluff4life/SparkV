const Discord = require("discord.js")
const request = require("node-fetch")

module.exports = (bot) => {
  bot.MSToTime = function(ms){
    var days = Math.floor(ms / 86400000) // 24*60*60*1000
    var daysms = ms % 86400000 // 24*60*60*1000
    var hours = Math.floor(daysms / 3600000) // 60*60*1000
    var hoursms = ms % 3600000 // 60*60*1000
    var minutes = Math.floor(hoursms / 60000) // 60*1000
    var minutesms = ms % 60000 // 60*1000
    var sec = Math.floor(minutesms / 1000)
  
    let str = ""
    if (days) str = str + days + " days "
    if (hours) str = str + hours + " hours "
    if (minutes) str = str + minutes + " minutes "
    if (sec) str = str + sec + " seconds "
  
    return str
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
