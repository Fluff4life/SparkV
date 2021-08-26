const { GiveawaysManager } = require("discord-giveaways");
const Levels = require("discord-xp");

const GiveawaysSchema = require("../../database/schemas/giveaways");
const logger = require("../../modules/logger");

module.exports = async bot => {
    var giveaways = await GiveawaysSchema.findOne({
        ID: "giveaways",
    });

    if (!giveaways) {
        giveaways = new GiveawaysSchema({
            ID: "giveaways",
            data: [],
        });
    }

    Levels.setURL(process.env.mongooseURL);
    class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
        async getAllGiveaways() {
            giveaways = await GiveawaysSchema.findOne({
                ID: "giveaways",
            });

            return Allgiveaways || [];
        }

        async saveGiveaway(MessageID, GiveawayData) {
            giveaways = await GiveawaysSchema.findOne({
                ID: "giveaways",
            });

            giveaways.data.push(GiveawayData);

            await giveaways
                .save()
                .catch(err =>
                    console.log(
                        `[Giveaway Manager] - Failed to save giveaway to database. ${err}`
                    )
                );

            return true;
        }

        async editGiveaway(MessageID, NewGiveawayData) {
            giveaways = await GiveawaysSchema.findOne({
                ID: "giveaways",
            });

            const NewGiveawaysArray = giveaways.data.filter(
                giveaway => giveaway.messageID !== MessageID
            );

            NewGiveawaysArray.push(NewGiveawayData);
            giveaways.data = NewGiveawaysArray;

            await giveaways
                .save()
                .catch(err =>
                    console.log(
                        `[Giveaway Manager] - Failed to edit giveaway and save to database. ${err}`
                    )
                );

            return true;
        }

        async deleteGiveaway(MessageID) {
            giveaways = await GiveawaysSchema.findOne({
                ID: "giveaways",
            });

            const NewGiveawaysArray = giveaways.data.filter(
                giveaway => giveaway.messageID !== MessageID
            );
            giveaways.data = NewGiveawaysArray;

            await giveaways
                .save()
                .catch(err =>
                    console.log(
                        `[Giveaway Manager] - Failed to delete giveaway and save to database. ${err}`
                    )
                );

            return true;
        }
    }

    const Manager = new GiveawayManagerWithOwnDatabase(bot, {
        updateCountdownEvery: 2.5 * 1000,
        default: {
            botsCanWin: false,
            exemptPermissions: [],
            embedColor: bot.config.bot.Embed.Color,
            embedColorEnd: "#FF0000",
            reaction: "🎉",
        },
    });

    bot.GiveawayManager = Manager;
};
