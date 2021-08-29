const Discord = require(`discord.js`);
const Weather = require(`weather-js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (!args) {
    return message.reply(`${bot.config.bot.Emojis.error} | Please specify a location!`);
  }

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
        return message.reply(`${bot.config.bot.Emojis.error} | Invalid location!`);
      }

      const Current = result[0].current;
      const Location = result[0].location;

      const WeatherInformation = new Discord.MessageEmbed()
        .setTitle(`${Current.observationpoint}'s Weather Forecast`)
        .setDescription(`Weather forecast for ${Current.observationpoint}`)
        .setThumbnail(Current.imageUrl)
        .addField(`**Tempature**`, `${Current.temperature}°F`, true)
        .addField(`**Wind**`, Current.winddisplay, true)
        .addField(`**Feels Like**`, `${Current.temperature}°F`, true)
        .addField(`**Humidity**`, `${Current.humidity}%`, true)
        .addField(`**Timezone**`, `${Location.timezone} UTC`, true)
        .setFooter(`Weather forecast for ${Current.observationpoint} • ${bot.config.bot.Embed.Footer}`)
        .setColor(bot.config.bot.Embed.Color)
        .setTimestamp();

      message.reply(WeatherInformation);
    },
  );
}

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
