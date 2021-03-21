const Discord = require("discord.js");
const DiscordEasyPages = require("discordeasypages")

exports.run = async (Bot, message, Arguments) => {
  if (message.author.id !== process.env.OwnerID) {
    return message.channel.send("❌Access denied.")
  }

  function clean(text) {
    if (typeof (text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  }

  if (Arguments[0].toLowerCase() === "bot:fetchguilds()") {
    const pages = []

    const CreatePage = (Bot, Server, ServerID) => {
      /* var OpenInvite
      
      Server
        .fetchInvites()
        .then(guildInvites => {
          if (!guildInvites.size === 0){
            if (!guildInvites.size === 1){
              console.log(guildInvites.size)
              const Invite = guildInvites.sort((a, b) => b.uses - a.uses)

              OpenInvite = Invite
            } else {
              console.log(`One invite for ${Server.name}`)
              OpenInvite = guildInvites[1]
            }
          } else {
            console.log(`No invites for ${Server.name}.`)
            Server.systemChannel.send("Hey! Looks like you're using an outdated version of ch1llblox meaning most features will not work. To fix this, please remove my bot and add it again by clicking the link here. https://discord.com/api/oauth2/authorize?client_id=763126208149585961&permissions=4231916662&scope=bot").catch(() => {})
            OpenInvite = "NoCode"
          }
        })
        */

      const NewEmbed = new Discord.MessageEmbed()
        .setTitle(`**${Server.name}**`)
        .setDescription(`*${Server.description || "N/A"}*`)
        .addField("Member Count", Server.memberCount || "N/A", true)
        .addField("Region", `${Server.region || "N/A"}`, true)
        .addField("Invite", `${OpenInvite}`)
        .setColor(Bot.Config.Embed.EmbedColor)
        .setThumbnail(Server.iconURL() || null)
        .setImage(Server.bannerURL() || "https://www.adl.org/sites/default/files/styles/open_graph_image_1200_x_628_/public/2019-08/discord-logo.jpg?itok=LMNTgq_N")

      pages.push(NewEmbed)
    }

    Bot.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .map((Server, ServerID) => CreatePage(Bot, Server, ServerID))
      .slice(0, 10)

    DiscordEasyPages(message, pages, ["⏪", "⏩", "🗑"], `Server List`)
  } else {
    try {
      const code = Arguments.join(" ")
      var evaled = eval(code)

      if (typeof evaled !== "string") {
        evaled = require("util").inspect(evaled)
      }

      if (evaled.includes(process.env.token)) {
        evaled = evaled.replace(process.env.token, "BOT_TOKEN")
      }

      message.channel.send(clean(evaled), { code: "js" })
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
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