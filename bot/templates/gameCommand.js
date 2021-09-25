const discord = require("discord.js");
const akinator = require("discord.js-akinator");
const NewCommand = require("./command");

module.exports = class ModCommand {
  constructor(execute, sett) {
    this.execute = execute;
    this.settings = new NewCommand(execute, Object.assign({ cooldown: 60 * 1000 }, sett)).settings;
  }

  async run(bot, message, args, command, data) {
    if (this.settings.type === "together") {
      bot.discordTogether
        .createTogetherCode(message.member.voice.channel.id, this.settings.gname)
        .then(async invite => message.reply(`${invite.code}`));
    } else if (this.settings.type === "game") {
      if (this.settings.gname === "akinator") {
        const gameTypes = [
          "animal",
          "character",
          "object"
        ];

        let gameType;
        // The Type of Akinator Game to Play. ("animal", "character" or "object")

        if (args[0]) {
          if (gameTypes.includes(args[0].toLowerCase())) {
            gameType = args[0].toLowerCase();
          } else {
            return message.reply(`Invalid game type: \`${args[0]}\``);
          }
        } else {
          gameType = "character";
        }

        akinator(message, {
          gameType: gameType,
          useButtons: true
        });
      } else {
        message.reply(`Invalid game name: \`${this.settings.gname}\``);
      }
    } else {
      message.reply(`Invalid game type: \`${this.settings.type}\``);
    }

    if (this.execute) {
      return this.execute(bot, message, args, command, data);
    }
  }
};
