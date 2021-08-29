const Discord = require("discord.js");

const GuildS = require("./schemas/guild");
const LogS = require("./schemas/log");
const MemberS = require("./schemas/member");
const UserS = require("./schemas/user");

async function fetchUser(key) {
  let user = await UserS.findOne({
    id: key,
  });

  if (user) {
    return user;
  } else {
    user = new UserS({
      id: key,
    });

    await user.save().catch(err => console.log(err));

    return user;
  }
}

async function fetchGuild(key) {
  let guild = await GuildS.findOne({
    id: key,
  });

  if (guild) {
    return guild;
  } else {
    guild = new GuildS({
      id: key,
    });

    await guild.save().catch(err => console.log(err));

    return guild;
  }
}

async function fetchMember(userID, guildID) {
  let member = await MemberS.findOne({
    id: userID,
    guildID: guildID,
  });

  if (member) {
    return member;
  } else {
    member = new MemberS({
      id: userID,
      guildID: guildID,
    });

    await member.save().catch(err => console.log(err));

    return member;
  }
}

async function createLog(message, command) {
  let newLog = new LogS({
    commandName: command.name,
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

  await newLog.save().catch(err => console.log(err));

  return newLog;
}

module.exports = {
  fetchUser,
  fetchGuild,
  fetchMember,
  createLog,
};
