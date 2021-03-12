const Discord = require("discord.js");
const Weather = require("weather-js")

exports.run = async (Bot, message, Arguments) => {
    if (!Arguments){
        return message.channel.send("Please specify a location!")
    }

    Arguments = Arguments.join(" ")

    Weather.find({
        search: Arguments,
        degreeType: "F"         
    }, (error, result) => {
        if (error){
            return message.channel.send(error)
        }

        if (result === undefined || result.length === 0){
            return message.channel.send("Invalid location!")
        }

        const Current = result[0].current
        const Location = result[0].location

        const WeatherInformation = new Discord.MessageEmbed()
            .setTitle(`${Location}'s Weather Forecast`)
            .setDescription(`Weather forecast for ${Current.observationpoint}`)
            .setThumbnail(Current.imageUrl)
            .addField(`**Tempature**`, `${current.temperature}°F`, true)
            .addField(`**Wind**`, current.winddisplay, true)
            .addField(`**Feels Like**`, `${current.temperature}°F`, true)
            .addField(`**Humidity**`, `${current.humidity}%`, true)
            .addField(`**Timezone**`, `${location.timezone} UTC`, true)
            .setFooter(`Weather forecast for ${Current.observationpoint}`)
            .setColor(process.env.EmbedColor)
            .setTimestamp()

        message.channel.send(WeatherInformation)

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