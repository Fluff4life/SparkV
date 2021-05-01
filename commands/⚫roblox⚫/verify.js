const Discord = require("discord.js");

function CreateID() {
    let text = ""
    let codes = ["❄", "🌨", "⛄", "☃", "🏂", "🎿", "⛷", "🏔", "🍧"]

    text += codes[Math.floor(Math.random() * codes.length)]
    text += codes[Math.floor(Math.random() * codes.length)]
    text += codes[Math.floor(Math.random() * codes.length)]
    text += codes[Math.floor(Math.random() * codes.length)]

    return text
}

exports.run = async (Bot, message, Arguments, command) => {
    if (Bot.Config.Debug === true) {
        return
    }

    const noblox = require("noblox.js");
    const RocordEnabled = await Bot.dashboard.getVal(message.guild.id, "RocordEnabled")

    if (RocordEnabled === "Enabled") {
        const GroupID = await Bot.dashboard.getVal(message.guild.id, "GroupID")

        if (isNaN(GroupID)) {
            message.lineReplyNoMention("This server isn't set up right! The GroupID setting is not a number.")
        }

        const Filter = (msg) => msg.author.id === message.author.id
        const MessageColector = message.channel.createMessageCollector(Filter, {
            max: 1,
            maxMatches: 1,
            time: 200 * 1000
        })

        let PromptEmbed = new Discord.MessageEmbed()
            .setTitle("Verification Prompt")
            .setDescription("What's your Roblox username?")
            .setFooter("This verification prompt will cancel after 200 seconds.")
            .setColor(Bot.Config.Embed.EmbedColor)
            .setTimestamp()

        message.lineReplyNoMention(PromptEmbed)

        MessageColector.on("collect", async (msg) => {
            if (msg.content.toLowerCase() === "cancel") {
                return message.lineReplyNoMention("Verification canceled.")
            }

            noblox.getIdFromUsername(msg.content).then(async (id) => {
                const VerificationID = CreateID() + CreateID() + CreateID() + CreateID()

                const UsernameFound = new Discord.MessageEmbed()
                    .setTitle("Verification Prompt")
                    .setDescription(`Hi, **${msg.content}**! To verify that you are indeed, ${msg.content}, please put "${VerificationID}" anywhere in your about section.\nSay **Done** when comeplete.\nSay **Cancel** to cancel.`)
                    .setFooter(`ID: ${id} • ${Bot.Config.Embed.EmbedFooter}`)
                    .setColor(Bot.Config.Embed.EmbedColor)
                    .setTimestamp()

                message.lineReplyNoMention(UsernameFound)

                const VerifyMessageColector = message.channel.createMessageCollector(Filter, {
                    max: 1,
                    maxMatches: 1,
                    time: 200 * 1000
                })

                VerifyMessageColector.on("collect", async (msg_) => {
                    if (msg_.content.includes("done") && msg_.author.id == message.author.id){
                        message.lineReplyNoMention("Fetching about status. Please wait...")

                        setTimeout(async () => {
                            noblox.getBlurb(id).then(async (about) => {
                                if (about.includes(VerificationID)){
                                    const Verified = new Discord.MessageEmbed()
                                        .setTitle("Verification Prompt")
                                        .setDescription("You're verified!")
                                        .setColor("GREEN")
                                        .setFooter(Bot.Config.Embed.EmbedFooter)

                                    message.lineReplyNoMention(Verified)

                                    const RocordRoleEnabled = await Bot.dashboard.getVal(message.guild.id, "RocordVerifyRoleEnabled")

                                    if (RocordRoleEnabled === "Enabled"){
                                        let VerifiedRole = message.guild.roles.find((r) => r.name.toLowerCase() === "verified" || r.name.toLowerCase().startsWith("verified") || r.name.toLowerCase().endsWith("verified"))
                                    
                                        if (!VerifiedRole){
                                            return message.lineReplyNoMention("This server isn't set up right! Verified role not found. Make sure you've created a role that contains \"Verified\".")
                                        }
    
                                        message.member.roles.add(VerifiedRole).catch(() => {
                                            return message.lineReplyNoMention("I cannot give you this role! Due to Discord API, please check my permisions and make sure I'm higher then your highest role.")
                                        })
                                    }

                                    const RocordNicknameTemplate = await Bot.dashboard.getVal(message.guild.id, "RocordNicknameTemplate")

                                    if (RocordNicknameTemplate){
                                        if (RocordNicknameTemplate.Includes("{discord-name}")){
                                            RocordNicknameTemplate.replace("{discord-name}", message.author.name)
                                        }

                                        if (RocordNicknameTemplate.Includes("{discord-id}")){
                                            RocordNicknameTemplate.replace("{discord-id}", message.author.id)
                                        }

                                        if (RocordNicknameTemplate.Includes("{roblox-username}")){
                                            RocordNicknameTemplate.replace("{roblox-username}", m.content)
                                        }

                                        if (RocordNicknameTemplate.Includes("{roblox-id}")){
                                            RocordNicknameTemplate.replace("{roblox-id}", id)
                                        }

                                        message.member.setNickname(RocordNicknameTemplate).catch(() => {
                                            return message.lineReplyNoMention("I cannot change your nickname! Due to Discord API, please check my permisions and make sure I'm higher then your highest role.")
                                        })
                                    }
                                } else {
                                    message.lineReplyNoMention("Failed to find Verification ID on your about page.")
                                }
                            })
                        }, 5 * 1000)
                    } else if (msg_.content.includes("cancel") && msg_.author.id === message.author.id){
                        return message.lineReplyNoMention("Cancelled prompt.")
                    }
                })
            })
        })
    }
},

    exports.config = {
        name: "Verify",
        description: "Verify yourself! Only works when enabled on the dashboard.",
        aliases: ["v", "vir"],
        usage: "<username>",
        category: "⚫roblox⚫",
        bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
        member_permissions: ["ADMINISTRATOR"],
        enabled: true,
        cooldown: 60
    }