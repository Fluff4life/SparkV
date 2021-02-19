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
  .setColor("#0099ff")

  const VerificationMessage = await message.channel.send(VerificationEmbed)
    const Emoji = await Bot.PromptMessage(VerificationMessage, message.author, ["✅", "❌"], 60)

    if (Emoji === "✅"){
      // Yes
      VerificationMessage.delete()

      let data = await require("../../database/server").findOne({
        GuildID: message.guild.id,
        UserID: User.id
      })

      if (data){
        data.Warnings.unshift({
          ModeratedUser_Name: User.user.username,
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
      } else if (!data){
        let NewData = new require("../../database/data")({
          GuildID: message.guild.id,
          UserID: user.Id,

          Punishments: [{
            Warnings: {
              ModeratedUser_Name: User.user.username,
              Moderator_Name: message.author.user,
              Moderator_ID: message.author.id,
              Reason: Reason
            }
          }]
        })
        
        User.send("You have been warned in **" + message.guild.name + "** for " + Reason)
        
        NewData.save()
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