const Discord = require("discord.js")

const logger = require("../../modules/logger")
require("../")

exports.run = async (Bot, event) => {
  await logger(`Bot Warning! - ${event}`, "warning")
}
