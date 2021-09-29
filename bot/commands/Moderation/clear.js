const Discord = require(`discord.js`);

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  let messages;

  if (args[0]) {
    if (args[0] === "all") {
      console.log(args[0]);
      args[0] = 99;
    } else if (args[0] === "bots") {
    } else if (args[0] === "users") {
      messages = await message.channel.messages
        .fetch({
          limit: 99,
        })
        .then(msgs => msgs.filter(msg => !msg.author.bot));
    }
  }

  if (!isNaN(parseInt(args[0]))) {
    console.log("1");
    const msgCount = parseInt(args[0]) + 1;

    if (isNaN(msgCount)) {
      return message.reply("The provided number of messages to delete isn't a valid number.");
    } else if (msgCount < 1 || msgCount > 100) {
      return message.reply("The provided number of messages to delete is either under 1 or above 99.");
    }

    messages = await message.channel.messages
      .fetch({
        limit: 99,
      })
      .then(msgs => {
        // Filters
        if (args[1] === "ignorePinned") {
          return msgs.filter(msg => !msg.pinned);
        } else if (args[1] === "usersOnly") {
          return msgs.filter(msg => !msg.author.bot);
        } else if (args[1] === "botsOnly") {
          return msgs.filter(msg => msg.author.bot);
        }

        return msgs;
      });

    message.channel.bulkDelete(messages).catch(err => {
      console.error(err, "1");

      return message.channel.send(
        "Uh oh! An error occured while trying to delete messages in this channel. Please check my permissions and try again.",
      );
    });
  } else if (messages) {
    console.log("2");
    message.delete().catch(err => {})

    if (args[1] && !args[1] === "ignorePinned") {
      messages = messages.filter(msg => !msg.pinned);
    }

    message.channel.bulkDelete(messages).catch(err => {
      console.error(err, "2");

      return message.channel.send(
        "Uh oh! An error occured while trying to delete messages in this channel. Please check my permissions and try again.",
      );
    });
  } else {
    return message.channel.send(
      "Uh oh! An error occured while trying to delete messages in this channel. Please check my permissions and try again.",
    );
  }

  message.channel.send(`Successfully cleared **${messages.length}** messages!`).then(msg => {
    setTimeout(() => msg.delete(), 5 * 1000);
  });
}

module.exports = new cmd(execute, {
  description: `I'll delete messages for you!`,
  dirname: __dirname,
  usage: `<all | users | bots> <filter (ignorePinned)>`,
  aliases: [`purge`, `clr`],
  perms: ["MANAGE_MESSAGES"],
});
