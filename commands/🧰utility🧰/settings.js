const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const DataSettings = Bot.Settings
  const Data = await DataSettings.findOne({
    Guild: `${message.guild.name} (${message.guild.id})`,
  })

  if (!msg.member.hasPermission("ADMINISTRATOR")){
    return msg.channel.send("You don't have permision to run this command!").then(m => m.delete({ timeout: 500 }))
  }
  
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
          Prefix: Arguments[1],

          WelcomeSettings: {
            WelcomeEnabled: Data.Settings.WelcomeEnabled,
            WelcomeMessage: Data.Settings.WelcomeMessage,
            WelcomeChannelID: Data.Settings.WelcomeChannelID
          },
        }
      })
      
      newData.save()
      message.channel.send(`The server's new prefix is now **${Arguments[1]}**`)
    } else if (!Data){
      message.channel.send(`The server's new prefix is now **${Arguments[1]}**`)
      
      let newData = new DataSettings({
        Guild: `${message.guild.name} (${message.guild.id})`,
        
        Settings: {
          Prefix: Arguments[1],

          WelcomeSettings: {
            WelcomeEnabled: Data.Settings.WelcomeEnabled,
            WelcomeMessage: Data.Settings.WelcomeMessage,
            WelcomeChannelID: Data.Settings.WelcomeChannelID
          },
        }
      })
      
      newData.save()
    }
  } else if (Arguments[0].toLowerCase() === "welcomechannel"){
    // Welcome Channel

    if (!Arguments[1]){
      return message.channel.send("Should I enable or disable the welcome setting?")
    }

    if (!Arguments[2]){
      return message.channel.send("What do I set the message to be?")
    }
    
    if (Data){
      await DataSettings.findOneAndRemove({
        Guild: `${message.guild.name} (${message.guild.id})`
      })
      
      let newData = new DataSettings({
        Guild: `${message.guild.name} (${message.guild.id})`,
        
        Settings: {
          Prefix: Data.Settings.Prefix,

          WelcomeSettings: {
            WelcomeEnabled: Arguments[1],
            WelcomeMessage: `${Arguments[2]}`,
            WelcomeChannelID: message.channel.id
          },
        }
      })
      
      newData.save()
      message.channel.send(`The server's new Welcome Settings has been updated. Welcome Enabled: **${Arguments[1]}**, Welcome Message: ${Arguments[2]}, Welcome Channel: ${message.channel.name}.`)
    } else if (!Data){
      let newData = new DataSettings({
        Guild: `${message.guild.name} (${message.guild.id})`,
        
        Settings: {
          Prefix: process.env.prefix,

          WelcomeSettings: {
            WelcomeEnabled: Arguments[1],
            WelcomeMessage: Arguments[2],
            WelcomeChannelID: message.channel.id
          },
        }
      })
      
      newData.save()
      message.channel.send(`The server's new Welcome Settings has been updated. Welcome Enabled: **${Arguments[1]}**, Welcome Message: ${Arguments[2]}, Welcome Channel: ${message.channel.name}.`)
    } else {
    return message.channel.send("Unknown setting. Settings: Prefix.")
  }
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
    description: "I will set a setting to your choice. Settings: Prefix, WelcomeChannel.",
    usage: "<Setting Type> <Setting Value>",
    category: "🧰utility🧰",
    cooldown: 2.5
  }