const { MessageEmbed } = require("discord.js");

exports.run = async (Bot, msg) => {
  if (!Bot.CheckPerm(msg)){
    return  msg.channel.send("❌Access denied.")
  }

  const VerificationEmbed = new MessageEmbed()
  .setTitle("Convermination Prompt")
  .setDescription("Are you sure you want to do this?")
  .setFooter("Canceling in 60 seconds if no emoji reacted.")
  .setColor("#0099ff")

  const VerificationMessage = await message.channel.send(VerificationEmbed)
    const Emoji = await Bot.PromptMessage(VerificationMessage, message.author, ["✅", "❌"], 30)

    if (Emoji === "✅"){
      // Yes
      VerificationMessage.delete()

      Bot.setActivity("Bot is now going offline.", { type: "OFFLINE" })

        message.channel.send({
          embed: {
            title: `Shutting Down`,
            description: `Bot is now going offline. Goodnight!`,
            color: "#0099ff",
            
            footer: {
              text: "Goodnight!",
              icon_url: process.env.bot_logo
            }
          },
        })
    } else if (emoji === "❌"){
      VerificationMessage.delete()

      message.channel.send("❌Shutdown canceled.").then(m => m.delete({ timeout: 10000 }))
    }
},
  
  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["invite", "support"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },
  
  exports.help = {
    name: "Invite",
    description:
      "Need help with me or you want to invite me to your server? This command makes inviting easy!",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 1.5
  }