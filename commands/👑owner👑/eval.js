const Discord = require("discord.js");
const DiscordEasyPages = require("discordeasypages")

exports.run = async (Bot, message, Arguments) => {
  if (message.author.id !== process.env.OwnerID) {
    return message.lineReplyNoMention("❌ Access denied.")
  }

  if (Arguments.length == 0) {
    return message.lineReplyNoMention("❌︱Please input code.")
  }

  function clean(text) {
    if (typeof (text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  }

  try {
    const asyncify = code => `(async () => {\nawait ${clean(code.trim())}\n})`
    let result = await eval(asyncify(Arguments.join(" ")))

    if (typeof result !== "string") {
      result = require("util").inspect(result, false, 1)
    }

    message.lineReplyNoMention(`✅︱Code executed successfully. \`\`\`js\n${result}\`\`\``)
  } catch (err) {
    console.error(err)

    return message.lineReplyNoMention(`❌︱Uh oh! There was an error executing that code.\n\`\`\`js\n${err}\`\`\``)
  }
},

  exports.config = {
    name: "Eval",
    description: "This is an owner only command.",
    aliases: [],
    usage: "",
    category: "👑owner👑",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
  }