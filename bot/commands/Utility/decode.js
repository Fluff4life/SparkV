const os = require("os");
const Discord = require("discord.js");

const cmd = require("../../templates/command");

module.exports = new cmd(
  async (bot, message, args) => {
    if (!args) {
      return message.reply(
        "Next time, choose the type of decoding and the text to encode. Types: `base64`, `hex` or `url`",
      );
    }

    let [type, ...string] = args;

    if (type === "base64") {
      message.reply(Buffer.from(string.join(" "), "base64").toString());
    } else if (type === "hex") {
      message.reply(Buffer.from(string.join(" "), "hex").toString("utf8"));
    } else if (type === "url") {
      message.reply(decodeURIComponent(string.join(" ")));
    }
  },
  {
    description: "decode a string that was encoded",
    dirname: __dirname,
    usage: "<type> <string>",
    aliases: [],
    perms: ["EMBED_LINKS"],
  },
);
