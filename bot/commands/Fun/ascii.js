const Discord = require(`discord.js`);
const figlet = require(`figlet`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (!args || !args[0]) {
    return message.reply(`Please provide text!`);
  }

  args = args.join(` `);

  figlet.text(args, (err, data) => {
    if (err) {
      console.log(`Failed to figlet text: ${err}`);

      return message.reply(`Uh oh! Something went wrong.`);
    }

    if (data.length > 1800) {
      return message.reply(`Please provide text shorter than 200 characters.`);
    }

    message.reply(`\`\`\`${data}\`\`\``);
  });
}

module.exports = new cmd(execute, {
  description: `I will change any text to ascii!`,
  dirname: __dirname,
  aliases: [],
  usage: `<text>`,
});
