const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  if (!Arguments || !Arguments[0]){
    return msg.channel.send("Please provide a question for me to answer.")
  }

  Arguments = Arguments.join(" ")

  let response

  try {
    response = math.evaluate(Arguments)
  } catch(err){
    return msg.channel.send("Please provide a __**VALID**__ math question.")
  }

  const CalculatorResult = new Discord.MessageEmbed()
  .setTitle("Calculator")
  .addField("Question:", `\`\`\`css\n${Arguments}\`\`\``)
  .addField("Answer:", `\`\`\`css\n${response}\`\`\``)
  .setColor("#0099ff")

  msg.channel.send(CalculatorResult)
},
  
  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["math"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },
  
  exports.help = {
    name: "Calculate",
    description: "I'll calculate an answer to a math problem.",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 1.5
  }