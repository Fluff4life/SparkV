const { configureScope } = require("@sentry/node");
const AntiSwearPackage = require("anti-swear-words-packages-discord");
const Levels = require("discord-xp");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const userS = require("../../database/schemas/user");

exports.run = async (bot, message) => {
  const data = {};

  if (message.author.bot) {
    return;
  }

  if (!message.guild) {
    return;
  }

  if (message.guild && !message.member) {
    await message.guild.members.fetch(message.author.id);
  }

  data.config = bot.config;

  if (message.guild) {
    data.guild = await bot.database.fetchGuild(message.guild.id);
  }

  if (message.guild) {
    data.member = await bot.database.fetchMember(message.author.id, message.guild.id);
  }

  data.user = await bot.database.fetchUser(message.author.id);

  // AFK //
  if (message.guild) {
    const AFKReason = data.user.afk;

    if (AFKReason) {
      data.user.afk = null;

      await data.user.save();
      message.reply(bot.config.bot.Responses.AFKWelcomeMessage);
    }

    message.mentions.users.forEach(async MentionedUser => {
      const MentionedUserData = await bot.database.fetchUser(MentionedUser.id);

      if (MentionedUserData.afk) {
        message.reply(
          bot.config.bot.Responses.AFKMessage.toString()
            .replaceAll(`{userMentioned}`, MentionedUser.user.username)
            .replaceAll(`{reason}`, MentionedUserData.afk || "Reason data not found!"),
        );
      }
    });
  }

  const AntiURL = bot.config.Debug.Enabled === true ? false : data.guild.settings.automod.removeLinks;
  // Await bot.dashboard.getVal(message.guild.id, `removelinks`);

  if (AntiURL === true) {
    if (!user.hasPermission(Discord.Permissions.FLAGS.MANAGE_MESSAGES) && bot.isURL(message.content)) {
      try {
        message.delete();
      } catch (err) {
        message
          .reply(bot.config.bot.Responses.InvalidPermisions.bot.toString().replaceAll(`{author}`, message.author))
          .then(m => m.delete({ timeout: 1000 }));
      }
    }

    return message.channel
      .send(`🔨 ${message.author}, you cannot send links here!`)
      .then(m => m.delete({ timeout: 1000 }));
  }

  const AntiSwear = bot.config.Debug.Enabled === true ? false : data.guild.settings.automod.removeProfanity;

  if (AntiSwear === true) {
    if (!user.hasPermission(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
      AntiSwearPackage(bot, message, {
        warnMSG: `🔨 ${message.author}, please stop cursing. If you curse again, you'll be muted.`,
        muteRole: `Muted`,
        ignoreWord: [`hello`],
        muteCount: 3,
        kickCount: 6,
        banCount: 12
      });
    }
  }

  const AntiSpam = bot.config.Debug.Enabled === true ? false : data.guild.settings.automod.removeDuplicateText;

  if (AntiSpam === true) {
    if (!message.channel.name.startsWith(`spam`) && !message.channel.name.endsWith(`spam`)) {
      bot.AntiSpam.message(message);
    }
  }

  const Leveling = bot.config.Debug.Enabled === true ? false : data.guild.settings.leveling.enabled;

  if (Leveling === true) {
    let MaxXP = data.guild.settings.automod.leveling.max;
    let MinXP = data.guild.settings.automod.leveling.min;

    if (isNaN(MaxXP)) {
      MaxXP = 25;
    }

    if (isNaN(MinXP)) {
      MinXP = 5;
    }

    const RandomXP = Math.floor(Math.random() * MaxXP || 25) + MinXP || 5;
    const HasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, RandomXP);

    if (HasLeveledUp) {
      const User = await Levels.fetch(message.author.id, message.guild.id);
      const Level = await bot.FormatNumber(User.level);

      message.reply(
        bot.config.bot.Responses.LevelUpMessage.toString()
          .replaceAll(`{author}`, message.author)
          .replaceAll(`{level}`, Level),
      );
    }
  }

  const Prefix = bot.config.Debug.Enabled === true ? "_" : data.guild.settings.prefix;
  const ChatBot = bot.config.Debug.Enabled === true ? null : data.guild.settings.chatbot;

  if (!message.content.startsWith(Prefix)) {
    if (!ChatBot) {
      return;
    }

    if (ChatBot.toLowerCase() === `message`) {
      return ActivateChatBot(bot, message, false);
    }
  }

  if (message.mentions.has(bot.user)) {
    const args = message.content
      .slice(bot.user.id.length + 4)
      .trim()
      .split(/ +/);
    const command = args.shift().toLowerCase();
    const commandfile =
      bot.commands.get(command) ||
      bot.commands.find(command_ => command_.config.aliases && command_.config.aliases.includes(command));
    if (commandfile) {
      return HandleCommand(bot, message, args, command, data, commandfile);
    } else {
      const ChatBot = bot.config.Debug.Enabled === true ? true : data.guild.settings.chatbot;

      if (ChatBot.toLowerCase() === `mention` && message.channel.type === "text") {
        return ActivateChatBot(bot, message, true);
      }
    }
  } else {
    const Prefix = bot.config.Debug.Enabled === true ? "_" : data.guild.settings.prefix;
    const ChatBot = bot.config.Debug.Enabled === true ? true : data.guild.settings.chatbot;

    console.log(Prefix);
    if (!message.content.startsWith(Prefix)) {
      if (ChatBot.toLowerCase() === `message`) {
        return ActivateChatBot(bot, message, false);
      }
    }

    if (!message.content.startsWith(Prefix)) {
      return;
    }

    const args = message.content.slice(Prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const commandfile =
      bot.commands.get(command) ||
      bot.commands.find(command_ => command_.config.aliases && command_.config.aliases.includes(command));

    return HandleCommand(bot, message, args, command, data, commandfile);
  }
};

async function HandleCommand(bot, message, args, command, data, commandfile) {
  if (!commandfile) {
    return;
  }

  if (process.env.USERBLACKLIST.includes(message.author.id)) {
    try {
      return message.author
        .send(`${bot.config.bot.Emojis.Error} | Uh oh! Looks like you're banned from using Ch1llBlox.`)
        .then(() => {
          message.react("❌");
        });
    } catch {
      message.react(bot.config.bot.Emojis.Error);
    }
  }

  if (commandfile.config.bot_permissions) {
    const BotPermisions = message.channel.permissionsFor(bot.user);

    if (!BotPermisions || !BotPermisions.has(Discord.Permissions.FLAGS[commandfile.config.bot_permissions])) {
      return message.reply(
        bot.config.bot.Responses.bot.toString().replaceAll(`{permission}`, commandfile.config.member_permissions),
      );
    }
  }

  if (commandfile.config.member_permissions) {
    const AuthorPermisions = message.channel.permissionsFor(message.author);

    if (!AuthorPermisions || !AuthorPermisions.has(Discord.Permissions.FLAGS[commandfile.config.member_permissions])) {
      return message.reply(
        bot.config.bot.Responses.bot.toString().replaceAll(`{permission}`, commandfile.config.member_permissions),
      );
    }
  }

  if (!commandfile.config.enabled) {
    return message.reply(
      `${bot.config.bot.Emojis.error} | This command is currently disabled! Please try again later.`,
    );
  }

  const MusicEnabled = bot.config.Debug.Enabled === true ? "Enabled" : await bot.dashboard.getVal(message.guild.id, `MusicEnabled`);
  const Leveling = bot.config.Debug.Enabled === true ? "Enabled" : await bot.dashboard.getVal(message.guild.id, `leveling`);

  if (commandfile.config.category === `🎵Music🎵` && MusicEnabled === `Disabled`) {
    return message.reply(
      `${bot.config.bot.Emojis.error} | This command is disabled by the server owner. Please visit my dashboard and enable leveling.`,
    );
  } else if (commandfile.config.category === `💫leveling💫` && Leveling === `Disabled`) {
    return message.reply(
      `${bot.config.bot.Emojis.error} | This command is disabled by the server owner. Please visit my dashboard and enable leveling.`,
    );
  }

  if (!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")) {
    const UserSlowmode = data.member.cooldown;

    if (UserSlowmode) {
      if (UserSlowmode.time > Date.now()) {
        const delay = message.convertTime(UserSlowmode.time, "to", true);

        return message.reply({
          embed: {
            title: `${bot.config.bot.Emojis.error} | Whoa there ${message.author.username}!`,
            description: `Please wait ${delay} more seconds to use that command again.`,
            thumbnail: message.author.avatarURL,
            color: `#0099ff`,
            footer: {
              text: bot.config.bot.Embed.Footer,
              icon_url: bot.user.displayAvatarURL(),
            },
          },
        });
      } else {
        UserSlowmode.time = commandfile.config.cooldown * 1000 || 3000 + Date.now();
      }
    } else {
      data.guild.slowmode.users.push({
        id: message.author.id + message.channel.id,
        time: commandfile.config.cooldown * 1000 || 3000 + Date.now(),
      });
    }
  }

  /*
  If (!bot.cooldowns.has(commandfile.config.name)) {
    bot.cooldowns.set(commandfile.config.name, new Discord.Collection())
  }

  const Now = Date.now()
  const Timestamps = bot.cooldowns.get(commandfile.config.name)
  const CooldownAmount = Math.round(commandfile.config.cooldown | (3 * 1000))

  if (Timestamps.has(message.author.id)) {
    const ExpireTime = Math.round(Timestamps.get(message.author.id) + CooldownAmount)

    if (Now < ExpireTime) {
      const TimeLeft = Math.round((ExpireTime - Now) / 1000)

      return message.reply({
        embed: {
          title: `${bot.config.bot.Emojis.error} | Whoa there ${message.author.username}!`,
          description: `Please wait ${TimeLeft} more seconds to use that command again.`,
          thumbnail: message.author.avatarURL,
          color: `#0099ff`,
          footer: {
            text: bot.config.bot.Embed.Footer,
            icon_url: bot.user.displayAvatarURL(),
          },
        },
      })
    }
  }

  Timestamps.set(message.author.id, Now)
  setTimeout(() => Timestamps.delete(message.author.id), CooldownAmount)
  */

  try {
    await commandfile.run(bot, message, args, command, data, data).then(async () => {
      const DeleteUsage = bot.config.Debug.Enabled === true ? "Disabled" : await bot.dashboard.getVal(message.guild.id, `deletecommandusage`);

      if (DeleteUsage === `Enabled`) {
        message.delete().catch(() => { });
      }
    });

    if (bot.StatClient) {
      bot.StatClient.postCommand(commandfile.config.name, message.author.id);
    }
  } catch (err) {
    console.error(err);

    const AnnonymousUser = `Annonymous`;

    configureScope(scope => {
      scope.setUser({
        AnnonymousUser,
      });

      scope.setTag(`Command`, commandfile.config.name);
      scope.setTag(`CurrentPing`, bot.ws.ping);
      scope.setTag(`GuildType`, message.channel.type);
    });

    message.reply(`${bot.config.bot.Emojis.error} | Uh oh! Something went wrong handling that command. Please join my Support Server (^Invite), create a ticket and report the following error: ${err}. Sorry!`,);
  }

  bot.database.createLog(message, data);
}

async function ActivateChatBot(bot, message, wasMentioned) {
  message.channel.startTyping();

  var SlicedMessage;

  if (message.content.slice(21) === "") {
    // If case the user replys to Ch1llBlox instead of mentioning him, or for some other silly reason.

    SlicedMessage = message.content;
  } else {
    SlicedMessage = message.content.slice(21);
  }

  try {
    await fetch(
      `http://api.brainshop.ai/get?bid=${encodeURIComponent(process.env.CHAT_BID)}&key=${encodeURIComponent(
        process.env.CHAT_KEY,
      )}&uid=${encodeURIComponent(message.author.id)}&msg=${encodeURIComponent(
        wasMentioned === true ? SlicedMessage : message,
      )}`,
    )
      .then(res => res.json())
      .then(body => {
        const botmsg = body.cnt;

        if (botmsg) {
          if (message.deleted) {
            return;
          }

          const APIEmbed = new Discord.MessageEmbed()
            .setTitle(`Ch1llBlox`)
            .setDescription(botmsg)
            .setFooter(
              `Never send personal information to Ch1llBlox. • ${bot.config.bot.Embed.Footer}`,
              bot.user.displayAvatarURL(),
            )
            .setColor(bot.config.bot.Embed.Color);

          if (bot.StatClient) {
            bot.StatClient.postCommand(`ChatBot`, message.author.id);
          }

          message.reply(APIEmbed);
        } else {
          console.error(`Failed to get message from Chat bot. Response: ${body}`);

          return message.reply(`${bot.config.bot.Emojis.error} | Wha- what? Something went wrong.`);
        }
      });
  } catch (err) {
    console.error(err);

    return message.reply(`${bot.config.bot.Emojis.error} | Wha- what? Something went wrong.`);
  }

  message.channel.stopTyping();
}
