const Discord = require("discord.js");

const command = require("../../templates/gameCommand");

async function execute(bot, message, args, command, data) {
  const { WouldYouRather } = require("weky");

  await WouldYouRather({
    message: message,
    embed: {
      title: "Would you rather...",
      color: "#7289da",
      timestamp: true,
    },
    thinkMessage: "Hmmmmmm",
    othersMessage: "Only <@{{author}}> can use the buttons!",
    buttons: { optionA: "Option A", optionB: "Option B" },
  });
}

module.exports = new command(execute, {
  description: "Would you rather.",
  usage: "",
  aliases: ["wyr"],
  perms: ["EMBED_LINKS"],
  type: "game",
});
