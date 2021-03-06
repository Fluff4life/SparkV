const Discord = require("discord.js")

module.exports = async (bot) => {
  bot.MSToTime = function(ms){
    let RoundNumber = ms > 0 ? Math.floor : Math.ceil;
    let Days = RoundNumber(ms / 86400000)
    let Hours = RoundNumber(ms / 3600000) % 24
    let Mins = RoundNumber(ms / 60000) % 60
    let Secs = RoundNumber(ms / 1000) % 60

    var time = (Days > 0) ? `${Days} Days, ` : ""
    time += (Hours > 0) ? `${Hours} Hours, ` : ""
    time += (Mins > 0) ? `${Mins} Minutes, ` : ""
    time += (Secs > 0) ? `${Secs} Seconds` : "0 Seconds"

    return time
  }

  bot.isURL = function(string){
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      
    if(regexp.test(string)) {
      return true;
    } else {
      return false;
    }
  }

  bot.Log = function(Status, Type, Details){
    console.log(`${Status} - ${Type} => ${Details}`)
  }

  bot.PromptMessage = async function(message, author, reactions, seconds){
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

  bot.GetServerCount = async function(){
    const promises = [
      bot.shard.fetchClientValues('guilds.cache.size'),
    ];
    
    return Promise.all(promises).then(results => results.reduce((acc, ServerCount) => acc + ServerCount, 0))
  }

  bot.GetUserCount = async function(){
    const promises = [
      bot.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
    ];
    
    return Promise.all(promises).then(results => results.reduce((acc, MemberCount) => acc + MemberCount, 0))
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

  /*
  OLD

  MS to Time Converter:
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
  */
}