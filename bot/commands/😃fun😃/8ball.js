const Discord = require(`discord.js`);

const Replies = [
  `It is certain`,
  `It is decidedly so`,
  `Without a doubt`,
  `Yes, definitely`,
  `You may rely on it`,
  `As I see it, yes`,
  `Most likely`,
  `Outlook good`,
  `Yes`,
  `Signs pointing to yes`,
  `Ask again later`,
  `Better not tell you now`,
  `Cannot predict now`,
  `Concentrate and ask again`,
  `Don't count on it`,
  `My reply is no`,
  `My sources say no`,
  `Outlook not so good`,
  `very doubtful`,
];

async function execute(bot, message, args, command, data) {
  if (!args || !args[0]) {
    return message.reply(`Please provide a question to ask 8ball.`);
  }

  const ReplyText = Math.floor(Math.random() * Replies.length + 0);

  return message.reply(Replies[ReplyText]);
}

module.exports = new cmd(execute, {
  description: `Just a little fun.`,
  aliases: ["ball"],
  usage: `<question>`
});
