const Discord = require("discord.js");
// Const Buttons = require("discord-buttons")
// const ButtonPages = require("discord-embeds-pages-buttons")
const EasyPages = require("discordeasypages");

const Rules = new Discord.Collection();
var SetRules = false;

(exports.run = async (bot, message, args, command, data) => {
<<<<<<< HEAD
  if (SetRules === false) {
    Rules.set(1, {
      Title: "Automation",
      Description:
        "Using automation (Ex: auto-typers) is forbidden. Using automation (and with found proof) will cause a wipe of your data and a ban from using Ch1llBlox.",
    });
=======
    if (SetRules === false) {
        Rules.set(1, {
            Title: "Automation",
            Description:
                "Using automation (Ex: auto-typers) is forbidden. Using automation (and with found proof) will cause a wipe of your data and a ban from using Ch1llBlox.",
        });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

        Rules.set(2, {
            Title: "Command Spamming",
            Description:
                "Spamming commands is forbidden. Spamming Ch1llBlox's commands will result with a warning. If continued, a complete wipe of your data and a ban from Ch1llBlox",
        });

<<<<<<< HEAD
    Rules.set(3, {
      Title: "Alternate Accounts",
      Description:
        "Using alternate accounts to earn yourself money is forbidden. If continued (with found proof), your data will be wiped and you will be banned from Ch1llBlox.",
    });

    SetRules = true;
  }

  const pages = [];

  const CreatePage = (bot, Message, RuleNumber, RuleTitle, RuleDescription) => {
    const NewEmbed = new Discord.MessageEmbed()
      .setTitle(`Rule #${RuleNumber} - ${RuleTitle}`)
      .setDescription(`\`\`\`${RuleDescription}\`\`\``)
      .setColor(bot.config.bot.Embed.Color)
      .setThumbnail(
        Message.author.displayAvatarURL({
          dynamic: true,
          format: "gif",
        }),
      );

    pages.push(NewEmbed);
  };

  Rules.map((RuleDetails, RuleNumber) =>
    CreatePage(bot, message, RuleNumber, RuleDetails.Title, RuleDetails.Description),
  );
  EasyPages(message, pages, ["⬅", "➡"]);
}),
  (exports.config = {
    name: "Rules",
    description: "Follow them lol.",
    aliases: ["TOS"],
    usage: "",
    category: "🧰Utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5,
  });
=======
        Rules.set(3, {
            Title: "Alternate Accounts",
            Description:
                "Using alternate accounts to earn yourself money is forbidden. If continued (with found proof), your data will be wiped and you will be banned from Ch1llBlox.",
        });

        SetRules = true;
    }

    const pages = [];

    const CreatePage = (
        bot,
        Message,
        RuleNumber,
        RuleTitle,
        RuleDescription
    ) => {
        const NewEmbed = new Discord.MessageEmbed()
            .setTitle(`Rule #${RuleNumber} - ${RuleTitle}`)
            .setDescription(`\`\`\`${RuleDescription}\`\`\``)
            .setColor(bot.config.bot.Embed.Color)
            .setThumbnail(
                Message.author.displayAvatarURL({
                    dynamic: true,
                    format: "gif",
                })
            );

        pages.push(NewEmbed);
    };

    Rules.map((RuleDetails, RuleNumber) =>
        CreatePage(
            bot,
            message,
            RuleNumber,
            RuleDetails.Title,
            RuleDetails.Description
        )
    );
    EasyPages(message, pages, ["⬅", "➡"]);
}),
    (exports.config = {
        name: "Rules",
        description: "Follow them lol.",
        aliases: ["TOS"],
        usage: "",
        category: "🧰Utility🧰",
        bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
        member_permissions: [],
        enabled: true,
        cooldown: 1.5,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
