const Discord = require("discord.js")

exports.run = async (Bot, event) => {
  console.log(`DISCONNECTED! => Bot disconnected with code ${event.code}.`)
  process.exit(0)
}
