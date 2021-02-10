// KingCh1ll //
// Last Edited: 1/21/2021 //
// Index.js //

// Please reframe from stealing as of copyright. //
console.log("  _                     _ _             ");
console.log(" | |                   | (_)            ");
console.log(" | |     ___   __ _  __| |_ _ __   __ _ ");
console.log(" | |    / _ \\ / _` |/ _` | | '_ \\ / _` |");
console.log(" | |___| (_) | (_| | (_| | | | | | (_| |");
console.log(" |______\\___/ \\__,_|\\__,_|_|_| |_|\\__, |");
console.log("                                   __/ |");
console.log("                                  |___/");

// Librarys //
const Discord = require("discord.js");
const noblox = require("noblox.js")
const DisTube = require("distube")
const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const pagination = require("discord.js-pagination")

// Modules //
const RunFunctions = require("./modules/functions.js");

// Start Dotenv //--
dotenv.config({
  path: __dirname + "/.env"
});

// Prepare Database //
mongoose.connect(`mongodb+srv://${process.env.mongoose_name}:${process.env.mongoose_password}@${process.env.mongoose_name_lowered}.egdb0.mongodb.net/Data`, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set("useFindAndModify", false)

// Bot //
// Deply Shards //
const ShardManager = new ShardingManager("./index.js", { token: process.env.token })

ShardManager.on("shardCreate", Shard => console.log(`Launched shard ${Shard.id}`))
ShardManager.spawn()

// Create Bot //
const Bot = new Discord.Client({
  disableEveryone: true,
  retryLimit: 5,

  presence: {
    activity: {
      name: `Loading bot!`,
      type: "PLAYING"
    },
    status: "DND"
  }
});

// Get User Count //
Bot.TotalMembers = 0

// DataStores Modules //
Bot.ModStore = require("./databases/mod_schema.js")
Bot.Settings = require("./databases/settings.js")

// Collections //
Bot.categories = new Discord.Collection();
Bot.commands = new Discord.Collection();
Bot.aliases = new Discord.Collection();
Bot.events = new Discord.Collection();
Bot.cooldowns = new Discord.Collection();

const ConsoleLog = true;

// Error Handlers //
process.on("uncaughtException", err => {
  const ErrorMessage = err.stack.replace(
    new RegExp(`${__dirname}/`, "g"),
    "./"
  );

  console.log(`Uncaught Exception error! ${ErrorMessage}`);
  console.error(err);

  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.log(`Unhandled rejection error! ${err}`);
});

// Code //
console.log("---------- Loading Functions ----------") 
RunFunctions(Bot);

console.log("---------- Logging into Roblox ----------") 
noblox
  .setCookie(process.env.RobloxBotCookie)

console.log("---------- Loading DisTube ----------") 
  Bot.distube = new DisTube(Bot, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })
  
  Bot.distube
    .on("playSong", (message, queue, song) => { 
    message.channel.send({
      embed: {
        title: `🎵 Now Playing ${song.name}🎵`,
        description: `Added by ${song.user || "unknown"}`,
        color: "#0099ff",
      
        url: song.url,
        
        fields: [
          {
            name: `▶Views`,
            value: song.views,
            inline: true,
          },
          
          {
            name: `👍Likes`,
            value: song.likes,
            inline: true,
          },
          
          {
            name: `👎Dislikes`,
            value: song.dislikes,
            inline: true,
          },
        ],
      
        thumbnail: {
          url: song.thumbnail
        },
        
        footer: {
          text: `😀 ${song.formattedDuration}`,
          icon_url: process.env.bot_logo
        },
      }
    }) 
  })
    .on("addSong", (message, queue, song) => {
    message.channel.send({
      embed: {
      title: `Added ${song.name} to queue`,
      description: `Added by ${song.user || "unknown"}`,
      color: "#0099ff",
      
      url: song.url,
        
      thumbnail: {
        url: song.thumbnail
      },
      
      footer: {
        text: `\`${song.formattedDuration}\``,
        icon_url: process.env.bot_logo
      },
    }
    })
  })
    .on("playList", (message, queue, playlist, song) => {
    message.channel.send(message.channel.send({
      embed: {
        title: `Playing ${playlist.name}`,
        description: `Added by ${song.user || "unknown"}`,
        color: "#0099ff",
        
      thumbnail: {
        url: song.thumbnail
      },
      
        url: song.url,
      
        footer: {
          text: `(${playlist.songs.length} songs) - Now Playing ${song.name} (\`${song.formattedDuration}\)`,
          icon_url: process.env.bot_logo
        },
      }
    }))
  })
    .on("addList", (message, queue, playlist) => {
    message.channel.send(message.channel.send({
      embed: {
        title: `Added ${playlist.name} to Queue`,
        description: `😀Added by ${playlist.user || "unknown"}`,
        color: "#0099ff",

        footer: {
          text: `${playlist.songs.length} songs (\`${playlist.formattedDuration}\`)`,
          icon_url: process.env.bot_logo
        },
      }
    }))
  })
    .on("finish", (message) => {
    message.channel.send("No songs left in queue. Add more songs!").then(m => m.delete({ timeout: 2000 }))
  })
    .on("noRelated", (message) => {
    message.channel.send("I cannot find a related video to play. I am stopping the music.").then(m => m.delete({ timeout: 2000 }))
  })
    .on("searchResult", (message, result) => {
    let Pages = []
    
    const CreatePage = (Message, Song) => {
      const NewEmbed = new Discord.MessageEmbed()
        .setTitle(`${Song.formattedDuration} | ${Song.name}`)
        .setDescription(`To select this song, send the page number.`)
        .setColor("#0099ff")
        .setURL(Song.url)
      
        .setImage(Song.thumbnail)
  
    Pages.push(NewEmbed)
  }
    
    result.map(song => CreatePage(message, song))
    
    pagination(message, Pages, ["⬅", "➡"])
  })
    .on("seachCancel", (message) => {
    message.channel.send(`Seaching canceled.`)
  })
  
    .on("empty", (message) => {
      message.channel.send("Voice chat is empty. Leaving the VC.").then(m => m.delete({ timeout: 2000 }))
    })
    .on("error", (message, err) => {
      console.error(err)
    
      message.channel.send({
        embed: {
          title: `Error Occured!`,
          description: err,
          color: "#0099ff",
      
          footer: {
            text: `Music command failed.`,
            icon_url: process.env.bot_logo
          }
        }
      }) 
    })

console.log("---------- Loading Events ----------");
fs.readdir("./events/", (err, files) => {
  if (err) {
    return console.log(`Error! ${err}`);
  }

  files.forEach(file => {
    let FileEvent = require(`./events/${file}`);
    let EventName = file.split(".")[0];

    if (ConsoleLog) {
      console.log(`✅Successfully loaded Event ${EventName}`);
    }

    Bot.on(EventName, (...args) => FileEvent.run(Bot, ...args));
  });
});

console.log("---------- Loading Commands ----------");
fs.readdir("./commands/", (err, cats) => {
  cats.forEach(cat => {
    Bot.categories.set(cat, cat);

    fs.readdir(`./commands/${cat}/`, (err, files) => {
      files.forEach(file => {
        if (!file.endsWith(".js")) {
          return;
        }

        let FileJs = require(`./commands/${cat}/${file}`);
        let commandname = file.split(".")[0];

        Bot.commands.set(commandname, FileJs);

        if (ConsoleLog) {
          console.log(`✅Successfully loaded command: ${commandname}!`);
        }
      });
    });
  });
});

Bot.login(process.env.token)