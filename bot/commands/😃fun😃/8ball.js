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

(exports.run = async (bot, message, args, command, data) => {
  if (!args || !args[0]) {
    return message.reply(`Please provide a question to ask 8ball.`);
  }

    const ReplyText = Math.floor(Math.random() * Replies.length + 0);

  return message.reply(Replies[ReplyText]);
}),
  (exports.config = {
    name: `8Ball`,
    description: `Just a little fun.`,
    aliases: [`ball`],
    usage: `<question>`,
    category: `😃Fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`],
    member_permissions: [],
    enabled: true,
    cooldown: 3,
  });
