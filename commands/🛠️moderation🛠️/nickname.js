const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(Arguments[0]) || `@<${Arguments[0]}>`;
  const NewNickname = Arguments.join(" ").slice(22)

  if (!Arguments[0]) {
    return message.channel.send("❌Please mention someone to change their nickname!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!User) {
    return message.channel.send("❌I cannot find that member!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!User.roles){
    return message.channel.send("That's not a user! That's a role.").then(m => m.delete({ timeout: 5000 }))
  }

  if (!NewNickname) {
    return message.channel.send("❌Please mention their new nickname!").then(m => m.delete({ timeout: 5000 }))
  }

  if (User.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
    return message.channel.send("Uh oh! I cannot change their nickname. They're a higher role than me!")
  }

  const VerificationEmbed = new Discord.MessageEmbed()
    .setTitle("Convermination Prompt")
    .setDescription("Are you sure you want to do this?")
    .setFooter("Canceling in 60 seconds if no emoji reacted.")

  const VerificationMessage = await message.channel.send(VerificationEmbed)
  const Emoji = await Bot.PromptMessage(VerificationMessage, message.author, ["✅", "❌"], 60)

  if (Emoji === "✅") {
    // Yes
    message.delete()
    VerificationMessage.delete()

    User.setNickname(NewNickname).then(() => {
      message.reply(`I successfully changed ${User}'s nickname to ${NewNickname}!`)
    }).catch((err) => {
      message.channel.send("Uh oh! I cannot change their nickname.").then(() => {
        console.error(err)
      })
    })
  } else if (emoji === "❌") {
    message.delete()

    message.channel.send("Nickname change canceled.").then(m => m.delete({ timeout: 10000 }))
  }
},

  exports.config = {
    name: "Nickname",
    description: "I'll change a user's nickname to your choice.",
    aliases: ["setnick"],
    usage: "<user> <reason>",
    category: "🛠️moderation🛠️",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "CHANGE_NICKNAME"],
    member_permissions: ["CHANGE_NICKNAME", "MANAGE_GUILD"],
    enabled: true,
    cooldown: 5
  }