const { Permissions } = require("discord.js");

const NewCommand = require("./command");

module.exports = class ModCommand {
  constructor(execute, sett) {
    this.execute = execute;
    this.settings = new NewCommand(execute, Object.assign({ cooldown: 60 * 1000 }, sett)).settings;
  }

  async run(bot, message, args, command, data) {
    if (!message.member.voice.channel) {
      return message
        .reply(`${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
        .then(m => m.delete({ timeout: 5000 }));
    }

    const perms = message.channel.permissionsFor(message.guild.me);

    if (
      !perms.has(Permissions.FLAGS.SPEAK) ||
      !perms.has(Permissions.FLAGS.CONNECT) ||
      !perms.has(Permissions.FLAGS.USE_VAD)
    ) {
      return message.reply("Make sure I have speak, connect and use voice activity perms.");
    }

    if (this.execute) {
      return this.execute(bot, message, args, command, data);
    }
  }
};
