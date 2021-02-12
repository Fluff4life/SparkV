const { MessageEmbed  } = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.members.first() || message.guild.members.cache.get(Arguments[0]) || message.guild.members.cache.find(User => User.user.username.toLowerCase() === Arguments.slice(0).join(" ") || User.user.username === Arguments[0])
  const Reason = Arguments.join(" ").slice(22) || "no reason provided."

  if (!message.member.hasPermission("MANAGE_MESSAGES")){
    return message.channel.send("❌You don't have permision to do that!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!Arguments[0]){
    return message.channel.send("❌Please mention someone to warn!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!User){
    return message.channel.send("❌I cannot find that member!").then(m => m.delete({ timeout: 5000 }))
  }

  if (User.id === message.author.id){
    return message.channel.send("❌You cannot warn yourself.").then(m => m.delete({ timeout: 5000 }))
  }

  if (!User.kickable){
    return message.channel.send("❌Uh oh... I can't warn this user!").then(m => m.delete({ timeout: 5000 }))
  }

  const VerificationEmbed = new MessageEmbed()
  .setTitle("Convermination Prompt")
  .setDescription("Are you sure you want to do this?")
  .setFooter("Canceling in 60 seconds if no emoji reacted.")

  const VerificationMessage = await message.channel.send(VerificationEmbed)
    const Emoji = await Bot.PromptMessage(VerificationMessage, message.author, ["✅", "❌"], 60)

    if (Emoji === "✅"){
      // Yes
      VerificationMessage.delete()

      var data = await Bot.DataSchemas.Server.findOne({
        GuildID: message.guild.id
      })
      
      if (data){
        data.ExtraDetails.unshift({
          GuildName: message.guild.name
        })

        data.Punishments.Warnings.unshift({
          ModeratedUser_Name: User.user.username,
          ModeratedUser_ID: User.id,
          Moderator_Name: message.author.user,
          Moderator_ID: message.author.id,
          Reason: Reason
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
      } else {
        data.ExtraDetails.unshift({
          GuildName: message.guild.name
        })

        data.Punishments.Warnings.unshift({
          ModeratedUser_Name: User.user.username,
          ModeratedUser_ID: User.id,
          Moderator_Name: message.author.user,
          Moderator_ID: message.author.id,
          Reason: Reason
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
    } else if (emoji === "❌"){
      VerificationMessage.delete()

      message.channel.send("❌Warn canceled.").then(m => m.delete({ timeout: 10000 }))
    }
},

exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["w"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES", "ADD_REACTIONS"]
  },
  
exports.help = {
    name: "Warn",
    description: "I will warn a user with the reason you want.",
    usage: "<user> <reason>",
    category: "🛠️moderation🛠️",
    cooldown: 15
  }