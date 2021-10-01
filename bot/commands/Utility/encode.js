const os = require("os");
const Discord = require("discord.js");

const cmd = require("../../templates/command");

module.exports = new cmd(
  async (bot, message, args) => {
    if (!args) {
      return message.reply("Next time, choose the type of encoding and the text to encode. Types: `base64`, `hex` or `url`");
    }

    let [type, ...string] = args;

    if (type === "base64") {
      message.reply(Buffer.from(string.join(" ")).toString("base64"));
    } else if (type === "hex") {
      let h = Buffer.from(string.join(" ")).toString("base64");
      let e = Buffer.from(h, "base64");

      message.reply(e.toString("hex"));
    } else if (type === "url") {
      message.reply(encodeURIComponent(string.join(" ")));
    }
  },
  {
    description: "encode a string",
    dirname: __dirname,
    usage: "<type> <string>",
    aliases: [],
    perms: ["EMBED_LINKS"],
  },
);
