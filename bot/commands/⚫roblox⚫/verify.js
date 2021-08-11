const Discord = require(`discord.js`);
const fetch = require("node-fetch");

function CreateID() {
  let text = `haha yes`;
  let codes = [`🥶`, `😰`, `😅`, `😓`, `⛄`, `💧`, `🧊`];

  text = `${codes[Math.floor(Math.random() * codes.length)]} ${codes[Math.floor(Math.random() * codes.length)]} ${codes[Math.floor(Math.random() * codes.length)]
    } ${codes[Math.floor(Math.random() * codes.length)]} ${codes[Math.floor(Math.random() * codes.length)]} ${codes[Math.floor(Math.random() * codes.length)]
    } ${codes[Math.floor(Math.random() * codes.length)]}`;

  return text;
}

exports.run = async (bot, message, args, command, data) => {
  if (bot.config.Debug.Enabled === true) {
    return;
  }

  const noblox = require(`noblox.js`);
  const RocordEnabled = await bot.dashboard.getVal(message.guild.id, `RocordEnabled`);

  if (RocordEnabled === `Enabled`) {
    const GroupID = await bot.dashboard.getVal(message.guild.id, `GroupID`);

    if (isNaN(GroupID)) {
      message.reply(`This server isn't set up right! The GroupID setting is not a number.`);
    }

    const Filter = msg => msg.author.id === message.author.id;
    const MessageColector = message.channel.createMessageCollector(Filter, {
      max: 1,
      maxMatches: 1,
      time: 200 * 1000,
    });

    fetch(`https://verify.eryn.io/api/user/${message.author.id}`).then(response => response.json()).then(body => {
      if (body.status === "ok") {
        const DiscordEmbed = new Discord.MessageEmbed()
          .setTitle(`Ch1llBlox Verification`)
          .setDescription(`You've been successfully verified as **${body.robloxUsername}**!`)
          .setColor(`GREEN`)
          .setFooter(bot.config.bot.Embed.Footer);
      } else {
        const DiscordEmbed = new Discord.MessageEmbed()
        .setTitle(`Verification Prompt`)
        .setDescription(`You've been successfully verified as **${body.robloxUsername}**!`)
        .setColor(bot.config.bot.Embed.Color)
        .setFooter(bot.config.bot.Embed.Footer);
      }
    });


    fetch(`https://verify.eryn.io/api/user/${message.author.id}`).then(response => response.json()).then(response => {
      // Fetching the API and transforming the response into JSON if not already.
      if (response.status === "ok") {
        // Checking if the request's status is okay
        const embed = new discord.MessageEmbed()
          .setTitle("SeaLink Verification")
          .setDescription(`You have been verified sucessfully under user: **${response.robloxUsername}**.`)

          .setColor("#1f75ff")
          .setFooter("SeaLink V2 | Dizzy Tech");
        message.channel.send(embed);
      } else {
        const embed = new discord.MessageEmbed()
          .setTitle("SeaLink Verification")
          .setDescription("Your not linked with our API! please visit [this](https://discord.com/oauth2/authorize?client_id=240413107850182656&scope=identify+guilds&response_type=code&redirect_uri=https%3A%2F%2Fverify.eryn.io) website to link yourself and then try again.")

          .setColor("#1f75ff")
          .setFooter("SeaLink V2 | Dizzy Tech");
        message.channel.send(embed);
      }
    });

    let PromptEmbed = new Discord.MessageEmbed()
      .setTitle(`Verification Prompt`)
      .setDescription(`What's your Roblox username?`)
      .setFooter(`This verification prompt will cancel after 200 seconds.`)
      .setColor(bot.config.bot.Embed.Color)
      .setTimestamp();

    message.reply(PromptEmbed);

    MessageColector.on(`collect`, async msg => {
      if (msg.content.toLowerCase() === `cancel`) {
        return message.reply(`Verification canceled.`);
      }

      noblox.getIdFromUsername(msg.content).then(async id => {
        if (!id) {
          return message.reply(`Verification canceled. User doesn't exist.`);
        }

        const VerificationID = CreateID();

        const UsernameFound = new Discord.MessageEmbed()
          .setTitle(`Verification Prompt`)
          .setDescription(
            `Hi, **${msg.content}**! To verify that you are indeed, ${msg.content}, please put \`${VerificationID}\` anywhere in your about section.\n\nSay **Done** when comeplete.\nSay **Cancel** to cancel.`,
          )
          .setFooter(`ID: ${id} • ${bot.config.bot.Embed.Footer}`)
          .setColor(bot.config.bot.Embed.Color)
          .setTimestamp();

        message.reply(UsernameFound);

        const VerifyMessageColector = message.channel.createMessageCollector(Filter, {
          max: 1,
          maxMatches: 1,
          time: 200 * 1000,
        });

        VerifyMessageColector.on(`collect`, async msg_ => {
          if (msg_.content.includes(`done`) && msg_.author.id === message.author.id) {
            message.reply(`Fetching about status. Please wait...`);

            setTimeout(async () => {
              noblox.getStatus(id).then(async status => {
                noblox.getBlurb(id).then(async about => {
                  if (about.includes(VerificationID) || status.includes(VerificationID)) {
                    message.reply(Verified);

                    const RocordRoleEnabled = await bot.dashboard.getVal(message.guild.id, `RocordVerifyRoleEnabled`);

                    if (RocordRoleEnabled === `Enabled`) {
                      let VerifiedRole = message.guild.roles.cache.find(
                        r =>
                          r.name.toLowerCase() === `verified` ||
                          r.name.toLowerCase().startsWith(`verified`) ||
                          r.name.toLowerCase().endsWith(`verified`),
                      );

                      if (!VerifiedRole) {
                        return message.reply(
                          `This server isn't set up right! Verified role not found. Make sure you've created a role that contains \`Verified\`.`,
                        );
                      }

                      message.member.roles.add(VerifiedRole).catch(() => {
                        message.reply(
                          `I cannot give you this role! Due to Discord API, please check my permisions and make sure I'm higher then your highest role.`,
                        );
                      });
                    }

                    const RocordNicknameTemplate = await bot.dashboard.getVal(
                      message.guild.id,
                      `RocordNicknameTemplate`,
                    );

                    if (RocordNicknameTemplate) {
                      if (RocordNicknameTemplate.toString().includes(`{discord-name}`)) {
                        RocordNicknameTemplate.toString().replaceAll(`{discord-name}`, message.author.name);
                      }

                      if (RocordNicknameTemplate.toString().includes(`{discord-id}`)) {
                        RocordNicknameTemplate.toString().replaceAll(`{discord-id}`, message.author.id);
                      }

                      if (RocordNicknameTemplate.toString().includes(`{roblox-username}`)) {
                        RocordNicknameTemplate.toString().replaceAll(`{roblox-username}`, m.content);
                      }

                      if (RocordNicknameTemplate.toString().includes(`{roblox-id}`)) {
                        RocordNicknameTemplate.toString().replaceAll(`{roblox-id}`, id);
                      }

                      message.member
                        .setNickname(RocordNicknameTemplate)
                        .catch(() =>
                          message.reply(
                            `I cannot change your nickname! Due to Discord API, please check my permisions and make sure I'm higher then your highest role.`,
                          )
                        );
                    }
                  } else {
                    message.reply(`Failed to find Verification ID on your status/about page.`);
                  }
                });
              });
            }, 5 * 1000);
          } else if (msg_.content.includes(`cancel`) && msg_.author.id === message.author.id) {
            return message.reply(`Cancelled prompt.`);
          }
        });
      });
    });
  } else {
    return message.reply(`Rocord isn't enabled in the dashboard. Please enable it and run this command again!`);
  }
},

  exports.config = {
    name: `Verify`,
    description: `Verify yourself! Only works when enabled on the dashboard.`,
    aliases: [`v`, `vir`],
    usage: `<username>`,
    category: `⚫Roblox⚫`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 60
  };
