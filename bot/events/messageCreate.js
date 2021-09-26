const { configureScope } = require("@sentry/node");
const AntiSwearPackage = require("anti-swear-words-packages-discord");
const Levels = require("discord-xp");
const Discord = require("discord.js");
const fetch = require("node-fetch");

let cooldowns = [];

module.exports = {
  once: false,
  async execute(bot, message) {
    // Data
    const data = {};

    // If the message's author is a bot, return. This prevents SparkV from responding to himself.
    if (message.author.bot) {
      return;
    }

    // Cache the member.
    if (message.guild && !message.member) {
      await message.guild.members.fetch(message.author.id);
    }

    // Data config.
    data.config = bot.config;

    // Get the Guild
    if (message.guild) {
      const guild = await bot.database.getGuild(message.guild.id);

      data.guild = guild;
      message.guild.data = data.guild;
    }

    if (message.guild) {
      // Fetch the member's data
      const member = await bot.database.getMember(message.author.id, message.guild.id);

      data.member = member;
    }

    // User data
    const userD = await bot.database.getUser(message.author.id);

    data.user = userD;

    if (!data) {
      return message.channel.send("Unable to get data. Please try again later.");
    }

    // Plugins
    if (message.guild) {
      if (data.user.afk) {
        data.user.afk = null;

        await data.user.save();
        message.reply(bot.config.Responses.AFKWelcomeMessage);
      }

      message.mentions.users.forEach(async u => {
        const user = await bot.database.getUser(u.id);

        if (user.afk) {
          message.reply(
            bot.config.Responses.AFKMessage.toString()
              .replaceAll(`{userMentioned}`, MentionedUser.user.username)
              .replaceAll(`{reason}`, MentionedUserData.afk || "Reason data not found!"),
          );
        }
      });

      if (data.guild.plugins.automod.removeProfanity === true) {
        if (!message.channel.permissionsFor(message.member).has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
          AntiSwearPackage(bot, message, {
            warnMSG: `🔨 ${message.author}, please stop cursing. If you curse again, you'll be muted.`,
            muteRole: `Muted`,
            ignoreWord: [`hello`],
            muteCount: 3,
            kickCount: 6,
            banCount: 12,
          });
        }
      }

      if (data.guild.plugins.automod.removeLinks === true) {
        if (!message.channel.permissionsFor(message.member).has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) && bot.isURL(message.content)) {
          try {
            message.delete();
          } catch (err) {
            message
              .reply(bot.config.Responses.InvalidPermisions.bot.toString().replaceAll(`{author}`, message.author))
              .then(m => m.delete({ timeout: 5000 }));
          }

          return message.channel
          .send(`🔨 ${message.author}, you cannot send links here!`)
          .then(m => m.delete({ timeout: 5000 }));
        }
      }

      const AntiSpam = data.guild.plugins.automod.removeDuplicateText;

      if (AntiSpam === true) {
        if (!message.channel.name.startsWith(`spam`) && !message.channel.name.endsWith(`spam`)) {
          bot.AntiSpam.message(message);
        }
      }

      const Leveling = data.guild.plugins.leveling.enabled;

      if (Leveling === true) {
        let MaxXP = data.guild.plugins.automod.leveling.max;
        let MinXP = data.guild.plugins.automod.leveling.min;

        if (isNaN(MaxXP)) {
          MaxXP = 25;
        }

        if (isNaN(MinXP)) {
          MinXP = 5;
        }

        const RandomXP = Math.floor(Math.random() * MaxXP || 25) + MinXP || 5;
        const HasLeveledUp = Levels.appendXp(message.author.id, message.guild.id, RandomXP);

        if (HasLeveledUp) {
          const User = Levels.fetch(message.author.id, message.guild.id);
          const Level = bot.functions.FormatNumber(User.level);

          message.reply(
            bot.config.Responses.LevelUpMessage.toString()
              .replaceAll(`{author}`, message.author)
              .replaceAll(`{level}`, Level),
          );
        }
      }
    }

    if (process.env.USERBLACKLIST.includes(message.author.id)) {
      try {
        return message.author
          .send(`${bot.config.Emojis.Error} | Uh oh! Looks like you're banned from using SparkV.`)
          .then(() => {
            message.react("❌");
          });
      } catch {
        message.react(bot.config.Emojis.Error);
      }
    }

    // Check for a prefix
    const prefix = bot.functions.getPrefix(message, data);

    if (!prefix) {
      return;
    }

    // Chat bot
    const ChatBot = bot.config.debug.enabled === true ? true : data.guild.plugins.chatbot;

    if (message.mentions.has(bot.user)) {
      if (ChatBot === "mention" && message.channel.type === "text") {
        return chatbot(message, true);
      }
    } else if (ChatBot === "message" && message.channel.type === "text") {
      return chatbot(message, false);
    }

    // Command Handler
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const commandfile = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

    if (!commandfile) {
      return;
    }

    if (!commandfile.settings.enabled) {
      return message.reply(
        `${bot.config.Emojis.error} | This command is currently disabled! Please try again later.`,
      );
    }

    if (commandfile.settings.guildOnly && !message.guild) {
      return message.channel.send(
        "This command is guild only. Please join a server with SparkV in it or invite SparkV to your own server.",
      );
    }

    if (commandfile.settings.ownerOnly && !message.author.id === process.env.OWNERID) {
      return message.channel.send("This command is reserved for KingCh1ll only.");
    }

    if (!cooldowns[message.author.id]) {
      cooldowns[message.author.id] = [];
    }

    const userCooldown = cooldowns[message.author.id];
    const time = userCooldown[commandfile.settings.name] || 0;

    if (time > Date.now()) {
      const cooldownEmbed = new Discord.MessageEmbed()
        .setTitle(`${bot.config.Emojis.error} | Whoa there ${message.author.username}!`)
        .setDescription(`Please wait ${Math.ceil((time - Date.now()) / 1000)} more seconds to use that command again.`)
        .setThumbnail(message.author.avatarURL)
        .setColor(`#0099ff`)
        .setFooter(bot.config.embed.footer, bot.user.displayAvatarURL());

      return message.reply({
        embeds: [
          cooldownEmbed
        ]
      });
    }

    cooldowns[message.author.id][commandfile.settings.name] = Date.now() + commandfile.settings.cooldown;

    try {
      await commandfile.run(bot, message, args, command, data).then(async () => {
        if (data.guild.autoRemoveCommands === true) {
          message.delete().catch(() => { });
        }

        bot.StatClient.postCommand(command, message.author.id);
      });
    } catch (err) {
      console.error(err);

      const AnnonymousUser = `Annonymous`;

      configureScope(scope => {
        scope.setUser({
          AnnonymousUser,
        });

        scope.setTag(`Command`, commandfile.settings.name);
        scope.setTag(`CurrentPing`, bot.ws.ping);
        scope.setTag(`GuildType`, message.channel.type);
      });

      message.reply(
        `${bot.config.Emojis.error} | Uh oh! Something went wrong handling that command. Please join my Support Server (^Invite), create a ticket and report the following error: ${err}. Sorry!`,
      );
    }
  },
};

async function chatbot(message, wasMentioned) {
  let SlicedMessage;

  if (message.content.slice(21) === "") {
    // If case the user replys to SparkV instead of mentioning him, or for some other silly reason.

    SlicedMessage = message.content;
  } else {
    SlicedMessage = message.content.slice(21);
  }

  try {
    await fetch(
      `https://api.brainshop.ai/get?bid=${encodeURIComponent(process.env.CHAT_BID)}&key=${encodeURIComponent(
        process.env.CHAT_KEY,
      )}&uid=${encodeURIComponent(message.author.id)}&msg=${encodeURIComponent(
        wasMentioned === true ? SlicedMessage : message,
      )}`,
    )
      .then(res => res.json())
      .then(body => {
        if (body.cnt) {
          if (message.deleted) {
            return;
          }

          const APIEmbed = new Discord.MessageEmbed()
            .setTitle(`SparkV`)
            .setDescription(body.cnt)
            .setFooter(
              `Never send personal information to SparkV. • ${bot.config.embed.footer}`,
              bot.user.displayAvatarURL(),
            )
            .setColor(bot.config.embed.color);

          bot.StatClient.postCommand(`ChatBot`, message.author.id);

          message.reply(APIEmbed);
        } else {
          return console.error(`Failed to get message from Chat bot. Response: ${body}`);
        }
      });
  } catch (err) {
    return console.error(`Failed to get message from Chat bot. ${err}`);
  }
}
