const { MessageEmbed  } = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.members.first() || message.guild.members.cache.get(Arguments[0]) || message.guild.members.cache.find(User => User.user.username.toLowerCase() === Arguments.slice(0).join(" ") || User.user.username === Arguments[0])
  const Reason = Arguments.join(" ").slice(22) || "no reason provided."

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
      const warningdata = Bot.Database.get(`ServerData_${message.guild.id}.warnings.${User.id}`)
      VerificationMessage.delete()

      if (!warningdata){
        Bot.Database.set(`ServerData_${message.guild.id}.${User.id}.warnings.count`, 1)
        Bot.Database.set(`ServerData_${message.guild.id}.${User.id}.warnings`, {
          username: User.user.username,
          modname: message.author.user,
          reason: Reason,
          warnings: 1,
        })

        try {
          User.send(`You've been warned in **${message.guild.name}** for ${Reason}`)
        } catch(err) {
          
        }

        message.channel.send({
          embed: {
            title: `Successfully warned user.`,
            description: `Successfully warned ${User} for ${Reason}`,
            color: "#0099ff",
            
            footer: {
              text: "Warn command successful.",
              icon_url: Bot.user.displayAvatarURL()
            }
          }
        })
      } else if (warnings){
        Bot.Database.add(`ServerData_${message.guild.id}.${User.id}.warnings.count`, 1)
        Bot.Database.add(`ServerData_${message.guild.id}.${User.id}.warnings`, {
          username: User.user.username,
          modname: message.author.user,
          reason: Reason,
        })

        try {
          User.send(`You've been warned in **${message.guild.name}** for ${Reason}`)
        } catch(err) {
          
        }

        message.channel.send({
          embed: {
            title: `Successfully warned user.`,
            description: `Successfully warned ${User} for ${Reason}`,
            color: "#0099ff",
            
            footer: {
              text: "Warn command successful.",
              icon_url: Bot.user.displayAvatarURL()
            }
          }
        })
      }
    } else if (emoji === "❌"){
      VerificationMessage.delete()

      message.channel.send("❌Warn canceled.").then(m => m.delete({ timeout: 10000 }))
    }
},

  exports.config = {
    name: "Warnings",
    description: "I will warn a user",
    aliases: ["w"],
    usage: "<user> <optional reason>",
    category: "🛠️moderation🛠️",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES", "ADD_REACTIONS"],
    member_permissions: ["MANAGE_MESSAGES"],
    enabled: true,
    cooldown: 15
  }