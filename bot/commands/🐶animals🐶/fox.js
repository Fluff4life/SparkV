const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (bot, message) => {
    request("https://randomfox.ca/floof/")
        .then(res => res.json())
        .then(async json => {
            const MemeMessage = await message.reply({
                embed: {
                    title: "What does the fox say!?",
                    description: "Awee :D",
                    color: "#0099ff",
                    url: json.image,

                    image: {
                        url: json.image,
                    },

                    footer: {
                        text: json.message,
                        image: bot.user.displayAvatarURL(),
                    },
                },
            });

            MemeMessage.react("😍");
        });
};
exports.config = {
    name: "Fox",
    description: "I will send a cute fox! Ducks are better.",
    aliases: ["cutefox"],
    usage: "",
    category: "🐶Animals🐶",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 3,
};
