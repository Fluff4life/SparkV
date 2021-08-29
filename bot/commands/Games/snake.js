const Discord = require(`discord.js`);

const cmd = require("../../templates/gameCommand");

async function execute(bot, message, args, command, data) {
  const { Snake } = require("weky");

  await Snake({
    message: message,
    embed: {
      title: "Snake",
      description: "Game over. You scored **{{score}}** points!",
      color: "#7289da",
      timestamp: true,
    },
    emojis: {
      empty: "⬛",
      snakeBody: "🟩",
      food: "🍎",
      up: "⬆️",
      right: "⬅️",
      down: "⬇️",
      left: "➡️",
    },
    othersMessage: "Only <@{{author}}> can use the buttons!",
    buttonText: "End",
  });
}

module.exports = new cmd(execute, {
  description: `Get those apples and grow, grow, grow to get the best score.`,
  usage: "",
  aliases: [],
  perms: ["EMBED_LINKS"],
  type: "game",
});
