const Discord = require("discord.js");
const Weather = require("weather-js")

exports.run = async (Bot, message, Arguments) => {
    if (!Arguments){
        return message.lineReplyNoMention("Please specify a location!")
    }

    Arguments = Arguments.join(" ")

    Weather.find({
        search: Arguments,
        degreeType: "F"         
    }, (error, result) => {
        if (error){
            return message.lineReplyNoMention(error)
        }

        if (result === undefined || result.length === 0){
            return message.lineReplyNoMention("Invalid location!")
        }

        const Current = result[0].current
        const Location = result[0].location

        const WeatherInformation = new Discord.MessageEmbed()
            .setTitle(`${Current.observationpoint}'s Weather Forecast`)
            .setDescription(`Weather forecast for ${Current.observationpoint}`)
            .setThumbnail(Current.imageUrl)
            .addField(`**Tempature**`, `${Current.temperature}°F`, true)
            .addField(`**Wind**`, Current.winddisplay, true)
            .addField(`**Feels Like**`, `${Current.temperature}°F`, true)
            .addField(`**Humidity**`, `${Current.humidity}%`, true)
            .addField(`**Timezone**`, `${Location.timezone} UTC`, true)
            .setFooter(`Weather forecast for ${Current.observationpoint}! • ${Bot.Config.Embed.EmbedFooter}`)
            .setColor(Bot.Config.Embed.EmbedColor)
            .setTimestamp()

        message.lineReplyNoMention(WeatherInformation)

    })     
},

exports.config = {
  name: "Weather",
  description: "Checks for todays weather forcast in the location specified.",
  aliases: [],
  usage: "<contry>",
  category: "😃fun😃",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
  member_permissions: [],
  enabled: true,
  cooldown: 5
}