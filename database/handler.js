const Discord = require("discord.js");

module.exports = {
  async getUser(UserID) {
    const UserS = require("./schemas/user");

    let user = await UserS.findOne({
      id: UserID,
    });

    if (user) {
      return user;
    } else {
      user = new UserS({
        id: UserID,
      });

      await user.save();
      return user;
    }
  },

  async getMember(MemberID, GuildID) {
    const MemberS = require("./schemas/member");

    let member = await MemberS.findOne({
      id: MemberID,
      guildID: GuildID,
    });

    if (member) {
      return member;
    } else {
      member = new MemberS({
        id: MemberID,
        guildID: GuildID,
      });

      await member.save();

      return member;
    }
  },

  async getGuild(GuildID) {
    const GuildS = require("./schemas/guild");

    let guild = await GuildS.findOne({
      id: GuildID,
    });

    if (guild) {
      return guild;
    } else {
      guild = new GuildS({
        id: GuildID,
      });

      await guild.save();

      return guild;
    }
  },

  async createLog(message, cmdName) {
    const LogS = require("./schemas/log");

    let newLog = new LogS({
      commandName: cmdName,
      user: {
        username: message.author.username,
        discriminator: message.author.discriminator,
        id: message.author.id,
      },
      guild: {
        name: message.guild ? message.guild.name : "dm",
        id: message.guild ? message.guild.id : "dm",
        channel: message.channel ? message.channel.id : "unknown",
      },
      date: Date.now(),
    });

    await newLog.save();

    return newLog;
  },
};
