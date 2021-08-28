const Discord = require("discord.js");

const logger = require("../../modules/logger");

exports.run = async (bot, event) => {
    await logger(`bot Warning! - ${event}`, "warning");
};
