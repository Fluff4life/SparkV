const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  if (msg.author.id !== process.env.owner) {
    return msg.channel.send("❌Access denied.")
  }

  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  }

  if (Arguments[0].toLowerCase() === "bot:fetch(guilds)") {
    Bot.guilds.cache.forEach(async (guild) => {
      const channel = guild.channels.cache
        .filter((channel) => channel.type === 'text')
        .first()

      if (!guild.member(Bot.user).hasPermission('CREATE_INSTANT_INVITE')) {
        return;
      }

      await channel
        .createInvite({ maxAge: 120, maxUses: 1 })
        .then(async (invite) => {
          console.log(`${guild.name} - ${invite.url}`)
        })
        .catch((error) => console.log(error));
    })
  } else {
    try {
      const code = Arguments.join(" ")
      var evaled = eval(code)
  
      if (typeof evaled !== "string"){
        evaled = require("util").inspect(evaled)
      }
  
      msg.channel.send(clean(evaled), { code: "xl" })
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
  }
},

  exports.config = {
    name: "Eval",
    description: "This is an owner only command.",
    aliases: [],
    usage: "",
    category: "🧰utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
  }