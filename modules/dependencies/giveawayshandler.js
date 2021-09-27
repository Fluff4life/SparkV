const { GiveawaysManager } = require("discord-giveaways");
const Levels = require("discord-xp");

const GiveawaysSchema = require("../../database/schemas/giveaways");
const logger = require("../../modules/logger");

module.exports = async bot => {
  const giveaways = await GiveawaysSchema.findOne({
    ID: "giveaways",
  });

  if (!giveaways) {
    const giveawayData = new GiveawaysSchema({
      ID: "giveaways",
      data: []
    });

    await giveawayData.save();
  }

  Levels.setURL(process.env.MONGOOSEURL);
  class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
    async getAllGiveaways() {
      const allGiveaways = await GiveawaysSchema.findOne({
        ID: "giveaways",
      });

      return allGiveaways.data || [];
    }

    async saveGiveaway(MessageID, GiveawayData) {
      const giveawayData = await GiveawaysSchema.findOne({
        ID: "giveaways",
      });

      giveawayData.data.push(GiveawayData);
      giveawayData.markModified("data");

      await giveawayData.save().catch(err => console.log(`[Giveaway Manager] - Failed to save giveaway to database. ${err}`));

      return true;
    }

    async editGiveaway(MessageID, NewGiveawayData) {
      const giveawayData = await GiveawaysSchema.findOne({
        ID: "giveaways",
      });

      const NewGiveawaysArray = giveawayData.data.filter(giveaway => giveaway.messageID !== MessageID);

      NewGiveawaysArray.push(NewGiveawayData);
      giveawayData.data = NewGiveawaysArray;
      giveawayData.markModified("data");

      await giveawayData.save().catch(err => console.log(`[Giveaway Manager] - Failed to edit giveaway and save to database. ${err}`));

      return true;
    }

    async deleteGiveaway(MessageID) {
      const giveawayData = await GiveawaysSchema.findOne({
        ID: "giveaways",
      });

      const NewGiveawaysArray = giveawayData.data.filter(giveaway => giveaway.messageID !== MessageID);
      giveawayData.data = NewGiveawaysArray;

      giveawayData.markModified("data");
      await giveawayData.save().catch(err => console.log(`[Giveaway Manager] - Failed to delete giveaway and save to database. ${err}`));

      return true;
    }
  }

  bot.GiveawayManager = new GiveawayManagerWithOwnDatabase(bot, {
    updateCountdownEvery: 2.5 * 1000,
    default: {
      botsCanWin: false,
      exemptPermissions: [],
      embedColor: bot.config.embed.color,
      embedColorEnd: "#FF0000",
      reaction: "🎉",
    },
  });
};
