const Discord = require("discord.js");

(exports.run = async (bot, message, args, command, data) => {
    const ID = args[0];

    if (!ID || isNaN(ID)) {
        return message.reply(`Please provide a valid message ID.`);
    }

    const Giveaway = bot.GiveawayManager.giveaways.find(
        (giveaway) => giveaway.messageID === args[0]
    );

    if (!Giveaway) {
        return message.reply(
            `I couldn\'t find a giveaway with that message ID.`
        );
    }

    bot.GiveawayManager.reroll(Giveaway.messageID)
        .then(() => {
            message.reply("Giveaway successfully rerolled!");
        })
        .catch((err) => {
            if (
                err.startsWith(
                    `Giveaway with ID ${Giveaway.messageID} is not ended`
                )
            ) {
                message.reply("This giveaway hasn't ended yet!");
            } else {
                console.error(err).then(() => {
                    message.reply(
                        "An error occured with Ch1llBlox! Please try this command again."
                    );
                });
            }
        });
}),
    (exports.config = {
        name: "RerollGiveaway",
        description:
            "Rerolls a giveaway. Requires the permision MANAGE_MESSAGES.",
        aliases: ["rerollg"],
        usage: "<MessageID>",
        category: "🤵Administration🤵",
        bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
        member_permissions: ["MANAGE_MESSAGES"],
        enabled: true,
        cooldown: 10,
    });
