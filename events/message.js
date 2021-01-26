const Discord = require("discord.js");

exports.run = async (Bot, Message) => {
  if (Message.author.Bot) {
    return;
  }
  
  if (!Message.content.startsWith(process.env.prefix)) {
    return;
  }
  
  const args = Message.content
    .slice(process.env.prefix.length)
    .trim()
    .split(/ +/);
  
  const command = args.shift().toLowerCase();
  const commandfile =
    Bot.commands.get(command) ||
    Bot.commands.find(
      command_ =>
        command_.config.aliases && command_.config.aliases.includes(command)
    );

  if (!commandfile) {
    return
  }

  if (commandfile.config.guild_only && Message.channel.type === "dm") {
    return Message.reply(`I cannot execute ${command.help.name} inside DMs!`);
  }

  if (!commandfile.config.enabled) {
    return Message.reply(
      "This command is currently disabled! Please try again later."
    );
  }

  if (!Bot.cooldowns.has(command.name)) {
    Bot.cooldowns.set(command.name, new Discord.Collection());
  }

  const Now = Date.now();
  const Timestamps = Bot.cooldowns.get(command.name);
  const CooldownAmount = (command.cooldown || 3) * 1000;

  if (Timestamps.has(Message.author.id)) {
    const ExpireTime = Timestamps.get(Message.author.id) + CooldownAmount;

    if (Now < ExpireTime) {
      const TimeLeft = (ExpireTime - Now) / 1000;

      const CooldownEmbed = new Discord.MessageEmbed()
        .setTitle(`Whoa there ${Message.author.username}!`)
        .setDescription(
          `Please wait ${TimeLeft.toFixed(
            1
          )} more second(s) to use that command again!`
        )
        .setThumbnail(Message.author.avatarURL)
        .setFooter(
          "Maybe up vote our bot while you wait?",
          process.env.bot_logo
        )
        .setColor("#0099ff")
        .setTimestamp();

      return Message.reply(CooldownEmbed);
    }
  }

  Timestamps.set(Message.author.id, Now);
  setTimeout(() => Timestamps.delete(Message.author.id), CooldownAmount);

  try {
    commandfile.run(Bot, Message, args, command);
  } catch (err) {
    console.log(`Error running command: ${command}! Error: ${err}`);
  }

  console.log(
    `\`\`\`\`\`\`\`\`\`\`\`\`\`\nNew Command!\nCommand: ${command}\nArguments: ${args}\nUser who activated this command: ${Message.author.tag}\n\`\`\`\`\`\`\`\`\`\`\`\`\``
  );
};