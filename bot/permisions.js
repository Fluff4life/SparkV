const { Permissions } = require("discord.js")

module.exports = [
    {
        level: 0,
        name: "User",
        check: () => true
    },
    {
        level: 1,
        name: "Moderator",
        check: (message) => (message.guild ? messafe.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) : false)
    },
    {
        level: 2,
        name: "Administrator",
        check: (message) => (message.guild ? message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) : false)
    },
    {
        level 3,
        name: "Owner",
        check: (message) => (message.guild ? message.author.id === message.guild.ownerID : false)
    },
    {
        level: 4,
        name: "Developer",
        check: (message) => {
            return ([
                "506567917220003850" // Qu1ckly_Frost
            ].includes(message.author.id) || (message.client.guilds.cache.has(message.client.config.supportServer) ? (message.client.guilds.cache.get(message.client.config.bot.support.id).members.cache.get(message.author.id) ? message.client.guilds.cache.get(message.client.config.bot.support.id).members.cache.get(message.author.id).roles.cache.has(message.client.config.bot.modRole) : false) : false))
        }
    },
    {
        level 5,
        name: "bot Owner",
        check: (message) => message.client.config.ownerID === message.author.id
    }
]
