const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (message.author.id !== process.env.C) {
    return message.reply(`${bot.config.Emojis.error} | Access denied.`);
  }

  if (!args) {
    return message.reply(`${bot.config.Emojis.error} | Please input code.`);
  }

  const Input = args.join(` `);

  if (!Input.toLowerCase().includes(`token`)) {
    const Embed = new Discord.MessageEmbed().setTitle(`${bot.config.Emojis.success} | Eval Results`);

    try {
      let Output = eval(Input);

      if (typeof Output !== `string`) {
        Output = require(`util`).inspect(Output, { depth: 0 });
      }

      Embed.addField(`Input`, `\`\`\`js\n${Input.length > 1024 ? `Input is too long to display.` : Input}\`\`\``)
        .addField(`Output`, `\`\`\`js\n${Output.length > 1024 ? `Output is too long to display.` : Input}\`\`\``)
        .setColor(`GREEN`);
    } catch (err) {
      Embed.addField(`Input`, `\`\`\`js\n${Input.length > 1024 ? `Input is too long to display.` : Input}\`\`\``)
        .addField(`Output`, `\`\`\`js\n${err.length > 1024 ? `Output is too long to display.` : Input}\`\`\``)
        .setColor(`GREEN`);
    }

    message.channel.send(Embed);
  } else {
    message.channel.send(`Token was contained in input. Nice try noob.`);
  }
}

module.exports = new cmd(execute, {
  description: `This is an owner only command.`,
  dirname: __dirname,
  aliases: [],
  usage: `<user>`,
});
