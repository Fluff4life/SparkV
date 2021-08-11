const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
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
},

  exports.config = {
    name: `Snake`,
    description: `Get those apples and grow, grow, grow to get the best score.`,
    aliases: [],
    usage: ``,
    category: `🎲Games🎲`,
    bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 60
};
