const Discord = require(`discord.js`);
const { inspect } = require("util");
const fetch = require("node-fetch");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (message.author.id !== process.env.OWNERID) {
    return message.reply(`${bot.config.Emojis.error} | Access denied.`);
  }

  let input = args.join(" ");
  let hasAsync = input.includes("return") || input.includes("await");
  let result;

  try {
    result = await eval(hasAsync ? `(async()=>{${input}})();` : input);

    if (typeof result !== "string") {
      result = inspect(result, {
        depth: +!(inspect(result, {
          depth: 1
        }).length > 1000)
      });
    }

    result = result.replace(new RegExp(process.env.token, "gi"), "BOTTOKEN");
  } catch (err) {
    result = err.message;
  }

  if (input.length + result.length >= 4000) {
    const paste = await fetch(`https://hastepaste.com/api/create?raw=false&ext=javascript&text=${encodeURIComponent(`${input}\n\n${result}`)}`, {
      method: "POST"
    }).catch(err => message.reply(err.message));

    return message.reply(`Eval exceeds 4000 characters. Please view here: ${paste.body}`);
  } else {
    const Embed = new Discord.MessageEmbed()
      .setTitle(`${bot.config.Emojis.success} | Eval Results`)
      .addField(`Input`, `\`\`\`${input}}\`\`\``)
      .addField(`Output`, `\`\`\`js\n${result}\`\`\``)
      .setColor(`GREEN`);

    return message.reply({
      embeds: [Embed]
    });
  }
}

module.exports = new cmd(execute, {
  description: `This is an owner only command.`,
  dirname: __dirname,
  aliases: [],
  usage: `<user>`,
});
