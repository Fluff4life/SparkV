const mongoose = require("mongoose");
const Discord = require("discord.js");

const GuildS = require("./schemas/guild");
const MemberS = require("./schemas/member");
const UserS = require("./schemas/user");

let mongoURL;

class database {
  /**
   * @param {string} [mURL] - Your valid mongoDB url.
   */

  async setURL(mURL) {
    if (!mURL) {
      throw new TypeError("Please provide a correct database URL.");
    }

    mongoURL = mURL;

    return mongoose.connect(mURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }

  /**
   * @param {string} [userID] - Key
   */

  async fetchUser(key) {
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

  /**
   * @param {string} [userID] - Key
   */

  async fetchGuild(key) {
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

      console.log(guild);
      return guild;
    }
  }

  /**
   * @param {string} [userID] - Key
   */

  async createUser(key) {
    if (!key) {
      throw new TypeError("A key was not provided.");
    }

    const user = await UserS.findOne({
      id: key,
    });

    if (user) {
      return false;
    }

    const newUser = new UserS({
      id: key,
    });

    await newUser.save().catch(err => console.error(`Failed to create user. ${err}`));

    return newUser;
  }

  /**
   * @param {string} [userID] - Key
   */

  async deleteUser(key) {
    if (!key) {
      throw new TypeError("A key was not provided.");
    }

    const user = await UserS.findOne({
      id: key,
    });

    if (!user) {
      return false;
    }

    await UserS.findOneAndDelete({
      id: key,
    }).catch(err => console.error(`Failed to delete user. ${err}`));

    return user;
  }
}

module.exports = database;
