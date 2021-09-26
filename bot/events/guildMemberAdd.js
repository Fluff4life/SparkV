const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

const database = require("../../database/handler");

const applyText = (canvas, text, fontSize = 60, font = "Bold") => {
  const context = canvas.getContext("2d");

  do {
    context.font = `${(fontSize -= 10)}px ${font}`;
  } while (context.measureText(text).width > canvas.width - 300);

  return context.font;
};

module.exports = {
  once: false,
  execute(bot, member) {
    const data = database.getGuild(member.guild.id);

    if (!data.plugins.welcome.enabled) {
      return;
    }

    let channel = member.guild.channels.cache.find(ch => ch.id === data.plugins.welcome.channel);

    if (!channel) {
      return;
    }

    channel.sentTyping();
    // To be continued.
  },
};
