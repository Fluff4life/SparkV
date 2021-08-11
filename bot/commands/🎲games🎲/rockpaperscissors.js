const Discord = require("discord.js");

exports.run = async (bot, message, args, command, data) => {
  const { RockPaperScissors } = require("weky");

  await RockPaperScissors({
    message: message,
    opponent: message.mentions.users.first(),
    embed: {
      title: "Rock Paper Scissors",
      description: "Press the button below to choose your element.",
      color: "#7289da",
      timestamp: true
    },
    buttons: {
      rock: "Rock",
      paper: "Paper",
      scissors: "Scissors",
      accept: "Accept",
      deny: "Deny",
    },
    time: 60 * 1000,
    acceptMessage: "<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!",
    winMessage: "<@{{winner}}> has won the game!",
    drawMessage: "Draw!",
    endMessage: "<@{{opponent}}> didn't answer in time.",
    timeEndMessage: "Both of you didn't pick something in time.",
    cancelMessage: "<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you. What a noob.",
    choseMessage: "You picked {{emoji}}.",
    noChangeMessage: "You cannot change your selection.",
    othersMessage: "Only {{author}} can use the buttons.",
    returnWinner: false
  });
},

  exports.config = {
    name: "RockPaperScissors",
    description: "Play a game of Rock Paper Scissors with me!",
    aliases: ["rps"],
    usage: "",
    category: "🎲Games🎲",
    bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 60
};
