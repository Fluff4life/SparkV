const Discord = require("discord.js");

const Settings = [
  "prefix"
]

exports.run = async (Bot, message, Arguments) => {
  const DataSettings = Bot.Settings
  const Data = await DataSettings.findOne({
    Guild: `${message.guild.name} (${message.guild.id})`,
  })
  
  if (!Arguments[0]){
    return message.channel.send("Please provide a valid setting.")
  }
  

  if (Arguments[0].toLowerCase() === "prefix"){
    // Prefix
    
    if (!Arguments[1]){
      return message.channel.send("What do I change the prefix to??")
    }
    
    if (Arguments[1].lenth > 5){
      return message.channel.send("Your new prefix must be under 5 characters.")
    }
    
    if (Data){
      await DataSettings.findOneAndRemove({
        Guild: `${message.guild.name} (${message.guild.id})`
      })
      
      let newData = new DataSettings({
        Guild: `${message.guild.name} (${message.guild.id})`,
        
        Settings: {
          Prefix: Arguments[1]
        }
      })
      
      newData.save()
      message.channel.send(`The server's new prefix is now **${Arguments[1]}**`)
    } else if (!Data){
      message.channel.send(`The server's new prefix is now **${Arguments[1]}**`)
      
      let newData = new DataSettings({
        Guild: `${message.guild.name} (${message.guild.id})`,
        
        Settings: {
          Prefix: Arguments[1]
        }
      })
      
      newData.save()
    
    }
  } else {
    return message.channel.send("Unknown setting. Settings: Prefix.")
  }
},
  
  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: [""],
    mod_only: false
  },
  
  exports.help = {
    name: "Settings",
    description: "Err",
    usage: "<Setting Type> <Setting Value>",
    category: "🧰utility🧰",
    cooldown: 2.5
  }