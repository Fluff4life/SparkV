const Discord = require(`discord.js`);
const Weather = require(`weather-js`);

(exports.run = async (bot, message, args, command, data) => {
<<<<<<< HEAD
  if (!args) {
    return message.reply(`${bot.config.bot.Emojis.error} | Please specify a location!`);
  }
=======
    if (!args) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | Please specify a location!`
        );
    }
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    args = args.join(` `);

    Weather.find(
        {
            search: args,
            degreeType: `F`,
        },
        (error, result) => {
            if (error) {
                return message.reply(error);
            }

            if (result === undefined || result.length === 0) {
                return message.reply(
                    `${bot.config.bot.Emojis.error} | Invalid location!`
                );
            }

            const Current = result[0].current;
            const Location = result[0].location;

            const WeatherInformation = new Discord.MessageEmbed()
                .setTitle(`${Current.observationpoint}'s Weather Forecast`)
                .setDescription(
                    `Weather forecast for ${Current.observationpoint}`
                )
                .setThumbnail(Current.imageUrl)
                .addField(`**Tempature**`, `${Current.temperature}°F`, true)
                .addField(`**Wind**`, Current.winddisplay, true)
                .addField(`**Feels Like**`, `${Current.temperature}°F`, true)
                .addField(`**Humidity**`, `${Current.humidity}%`, true)
                .addField(`**Timezone**`, `${Location.timezone} UTC`, true)
                .setFooter(
                    `Weather forecast for ${Current.observationpoint} • ${bot.config.bot.Embed.Footer}`
                )
                .setColor(bot.config.bot.Embed.Color)
                .setTimestamp();

<<<<<<< HEAD
      message.reply(WeatherInformation);
    },
  );
}),
  (exports.config = {
    name: `Weather`,
    description: `Checks for todays weather forcast in the location specified.`,
    aliases: [],
    usage: `<contry>`,
    category: `😃Fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `ADD_REACTIONS`],
    member_permissions: [],
    enabled: true,
    cooldown: 5,
  });
=======
            message.reply(WeatherInformation);
        }
    );
}),
    (exports.config = {
        name: `Weather`,
        description: `Checks for todays weather forcast in the location specified.`,
        aliases: [],
        usage: `<contry>`,
        category: `😃Fun😃`,
        bot_permissions: [
            `SEND_MESSAGES`,
            `EMBED_LINKS`,
            `VIEW_CHANNEL`,
            `ADD_REACTIONS`,
        ],
        member_permissions: [],
        enabled: true,
        cooldown: 5,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
