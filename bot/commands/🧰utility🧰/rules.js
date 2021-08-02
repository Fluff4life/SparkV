const Discord = require('discord.js');
// Const Buttons = require("discord-buttons")
// const ButtonPages = require("discord-embeds-pages-buttons")
const EasyPages = require('discordeasypages');

const Rules = new Discord.Collection();
var SetRules = false;

exports.run = async (bot, message, args, command, data) => {
  if (SetRules === false) {
    Rules.set(1, {
      Title: 'Automation',
      Description:
        'Using automation (Ex: auto-typers) is forbidden. Using automation (and with found proof) will cause a wipe of your data and a ban from using Ch1llBlox.',
    });

    Rules.set(2, {
      Title: 'Command Spamming',
      Description:
        "Spamming commands is forbidden. Spamming Ch1llBlox's commands will result with a warning. If continued, a complete wipe of your data and a ban from Ch1llBlox",
    });

    Rules.set(3, {
      Title: 'Alternate Accounts',
      Description: 'Using alternate accounts to earn yourself money is forbidden. If continued (with found proof), your data will be wiped and you will be banned from Ch1llBlox.',
    });

    SetRules = true;
  }

  const pages = [];

  const CreatePage = (bot, Message, RuleNumber, RuleTitle, RuleDescription) => {
    const NewEmbed = new Discord.MessageEmbed()
      .setTitle(`Rule #${RuleNumber} - ${RuleTitle}`)
      .setDescription(`\`\`\`${RuleDescription}\`\`\``)
      .setColor(bot.config.bot.Embed.Color)
      .setThumbnail(Message.author.displayAvatarURL({ dynamic: true, format: 'gif' }));

    pages.push(NewEmbed);
  };

  Rules.map((RuleDetails, RuleNumber) =>
    CreatePage(bot, message, RuleNumber, RuleDetails.Title, RuleDetails.Description),
  );
  EasyPages(message, pages, ['⬅', '➡']);
},

  exports.config = {
    name: 'Rules',
    description: 'Follow them lol.',
    aliases: ['TOS'],
    usage: '',
    category: '🧰utility🧰',
    bot_permissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'VIEW_CHANNEL'],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
};
