const discord = require("discord.js");
const NewCommand = require("./command");

module.exports = class ModCommand {
  constructor(execute, sett) {
    this.execute = execute;
    this.settings = new NewCommand(execute, Object.assign({ cooldown: 60 * 1000 }, sett)).settings;
  }

  async run(bot, message, args, command, data) {
    if (!message.member.voice.channel) {
      return message.reply("Please join a __voice channel__!");
    }

    if (this.settings.type === "together") {
      bot.discordTogether
        .createTogetherCode(message.member.voice.channel.id, this.settings.gname)
        .then(async invite => message.reply(`${invite.code}`));
    }

    if (this.execute) {
      return this.execute(bot, message, args, command, data);
    }
  }
};
