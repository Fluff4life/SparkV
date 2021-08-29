const Discord = require("discord.js");

exports.run = async (bot, message) => {
  const { Calculator } = require("weky");

  await Calculator({
    message: message,
    embed: {
      title: "Calculator",
      color: "#7289da",
      timestamp: true,
    },
    disabledQuery: "Calculator is disabled!",
    invalidQuery: "The provided equation is invalid!",
    othersMessage: "Only <@{{author}}> can use the buttons!",
  });
};

exports.config = {
  name: `Calculator`,
  description: `Calculate any equation!`,
  aliases: ["calc"],
  usage: ``,
  category: `🧰Utility🧰`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 1.5,
};
