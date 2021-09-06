const Discord = require("discord.js");

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  const Channels = message.guild.channels.cache.filter(channel => channel.type !== "category");

  if (args[0].toLowerCase() === "on") {
    Channels.forEach(Channel => {
      Channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      });
    });

    message.reply("🔒 Server is now locked. Users can no longer chat.");
  } else if (args[0].toLowerCase() === "off") {
    Channels.forEach(Channel => {
      Channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: true,
      });
    });

    message.reply("🔒 Server is now unlocked. Users can now chat.");
  }
}

module.exports = new cmd(execute, {
  description: "I'll lock the server.",
  dirname: __dirname,
  aliases: [],
  usage: `<on | off>`,
  perms: ["MANAGE_CHANNELS"],
});
