const Discord = require("discord.js")

exports.run = async (Bot, event) => {
  LogError("Fatal", event)

  console.log(`ERROR! => ${event}`)
}
