const Discord = require("discord.js");

exports.run = async (Bot, Message) => {
  if (Message.author.Bot) {
    return;
  }

  if (!Message.guild){
    return;
  }

  const AntiURL = await Bot.Database.get(`ServerData_${Message.guild.id}.AntiURL`)

  if (AntiURL && AntiURL === "on" && Bot.isURL(Message.content)){
    try {
      Message.delete();
    } catch (err){
      Message.channel.send(`${Message.author} sent a url, but I cannot delete it. Please give me permision to delete messages.`).then(m => m.delete({ timeout: 1000 }))
    }
    
    return Message.reply("you cannot send links here.").then(m => m.delete({ timeout: 1000 }))
  }

  const AntiSpam = await Bot.Database.get(`ServerData_${Message.guild.id}.AntiSpam`)

  if (AntiSpam && AntiSpam === "on"){
    Bot.AntiSpam.message(Message)
  }

  const Prefix = await Bot.Database.get(`ServerData_${Message.guild.id}.Prefix`)

  if (Prefix) {
    if (!Message.content.startsWith(Prefix)){
      return
    }
  } else {
    if (!Message.content.startsWith(process.env.prefix)) {
      return
    }
  }

  const PrefixLength = () => {
    if (Prefix) {
      return Prefix.length
    } else {
      return process.env.prefix.length
    }
  }

  const args = Message.content
    .slice(PrefixLength())
    .trim()
    .split(/ +/);

  const command = args.shift().toLowerCase();
  const commandfile = Bot.commands.get(command) || Bot.commands.find(command_ => command_.config.aliases && command_.config.aliases.includes(command));

  if (!commandfile) {
    return
  }

  if (Message.channel.type === "dm") {
    return
  }

  if (process.env.UserBlacklist.includes(Message.author.id)) {
    return
  }

  for (const permission of commandfile.config.bot_permissions) {
    if (!Message.guild.me.hasPermission([permission])) {
      return Message.channel.send(`❌I don't have permission to do that! Please select my role and allow ${permission}.`).then(m => m.delete({ timeout: 5000 }))
    }
  }

  if (!commandfile.config.enabled) {
    return Message.reply("This command is currently disabled! Please try again later.")
  }

  if (!Bot.cooldowns.has(command.name)) {
    Bot.cooldowns.set(command.name, new Discord.Collection());
  }

  const Now = Date.now();
  const Timestamps = Bot.cooldowns.get(command.name);
  const CooldownAmount = ((command.cooldown) * 1000)

  if (Timestamps.has(Message.author.id)) {
    const ExpireTime = Timestamps.get(Message.author.id) + CooldownAmount;

    if (Now < ExpireTime) {
      const TimeLeft = ((ExpireTime - Now) / 1000)

      return Message.reply({
        embed: {
          title: `Whoa there ${Message.author.username}!`,
          description: `Please wait ${TimeLeft.toFixed(1)} more second(s) to use that command again!`,
          thumbnail: Message.author.avatarURL,
          color: "#0099ff",
          footer: {
            text: "Maybe up vote our bot while you wait?",
            icon_url: process.env.bot_logo
          },
        },
      }
      )
    }
  }

  Timestamps.set(Message.author.id, Now);
  setTimeout(() => Timestamps.delete(Message.author.id), CooldownAmount);

  try {
    commandfile
      .run(Bot, Message, args, command)
      .then(() => { console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\nCOMMAND SUCCESS! \nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${Message.author.tag}`) })
  } catch (err) {
    console.log(`\`\`\`\`\`\`\`\`\`\`\`\`\`\nFAILED - FAILEd to run command! \nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${Message.author.tag}\nError: ${err}`)
  }
}