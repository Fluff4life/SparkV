const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const ModDatastore = Bot.ModStore

  const User = message.mentions.members.first() || message.guild.members.cache.get(Arguments[0]) || message.guild.members.cache.find(User => User.user.username.toLowerCase() === Arguments.slice(0).join(" ") || User.user.username === Arguments[0])
  const Reason = Arguments.join(" ").slice(22) || "no reason provided."
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")){
    return message.channel.send("You don't have permision to run this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (!User){
    return message.channel.send("Uhhh... who do I warn?").then(m => m.delete({ timeout: 5000 }))
  }
  
  if (message.author.id === User.id){
    return message.channel.send("Why would you warn yourself? lol.").then(m => m.delete({ timeout: 5000 }))
  }
  
  
  var data = await ModDatastore.findOne({
    Guild: `${message.guild.name} (${message.guild.id})`,
  })
  
  if (data){
    data.Punishments.unshift({
      PunishType: "Warn",
      User: `${User.user.username} (${User.id})`,
      Moderator: `${message.author.user} (${message.author.id})`,
      Reason: Reason,
    })
    
    User.send("You have been warned in **" + message.guild.name + "** for " + Reason)
    
    data.save()
    
    message.channel.send({
      embed: {
        title: `Successfully warned user.`,
        description: `Successfully warned ${User} for ${Reason}`,
        color: "#0099ff",
        
        footer: {
          text: "Warn command successful.",
          icon_url: process.env.bot_logo
        }
      }
    })
  } else if (!data){
    var newData = new ModDatastore({
      Guild: `${message.guild.name} (${message.guild.id})`,
    
      Punishments: [{
        PunishType: "Warn",
        User: `${User.user.username} (${User.id})`,
        Moderator: `${message.author.username} (${message.author.id})`,
        Reason: Reason,
      }, ],
    })
    
    User.send("You have been warned in **" + message.guild.name + "** for " + Reason)
    
    newData.save()
    message.channel.send({
      embed: {
        title: `Successfully warned user.`,
        description: `Successfully warned ${User} for ${Reason}`,
        color: "#0099ff",
        
        footer: {
          text: "Warn command successful.",
          icon_url: process.env.bot_logo
        }
      },
    })
  }
},

exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["w"],
    mod_only: false
  },
  
exports.help = {
    name: "Warn",
    description: "I will warn a user with the reason you want.",
    usage: "<user> <reason>",
    category: "🛠️moderation🛠️",
    cooldown: 15
  }