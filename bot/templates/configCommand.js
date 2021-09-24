const discord = require("discord.js");
const NewCommand = require("./command");

const GuildS = require("../../database/schemas/guild");
const database = require("../../database/handler");

module.exports = class configCommand {
  constructor(sett) {
    this.settings = new NewCommand(() => {}, Object.assign({ cooldown: 60 * 1000 }, sett)).settings;
  }

  async run(bot, message, args, command) {
    if (!args[0]) {
      return message.reply(this.settings.responces.invalid_args);
    }

    if (args[0].length > 5) {
      return message.reply(this.settings.responces.invalid_args_length);
    }

    GuildS.findOneAndUpdate({
      id: message.guild.id
    }, {
      settings: {
        prefix: args[0]
      }
    }, {
      setDefaultsOnInsert: true,
      new: true,
      upsert: true
    });

    return message.reply(`The prefix is now **\`${args[0]}\`**`);
  }
};
