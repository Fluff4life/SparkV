const Discord = require(`discord.js`);

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  let user = message.mentions.users.first();
  if (!args[0] || isNaN(args[0]) || parseInt(args[0]) < 1) {
    return message.replyT("Please provide valid command usage. For example, {prefix}clear <number of messages to delete>. If you want to delete all the messages, then just do ^clear all.");
  }

  if (args[0] && args[0] === "all") {
      const clonedChannel = await message.channel.clone();

      await message.channel.delete();
      clonedChannel.setPosition(message.channel.position);

      return newChannel.replyT("Successfully cleared all messages.");
  }

  await message.delete().catch(err => {});

  let messages = await message.channel.messages.fetch({
    limit: 100
  });
  messages = messages.array();

  if (user) {
    messages.filter(m => m.author.id === user.id);
  }

  if (messages.length > args[0]) {
    messages.length = parseInt(args[0], 10);
  }

  messages.filter(m => !m.pinned);
  args[0]++;

  message.channel.bulkDelete(messages, true);

  let mSuccess = await message.replyT(`Successfully cleared **${--args[0]}** messages${user ? ` from ${user.tag}.` : "."}`);

  setTimeout(() => mSuccess.delete(), 2 * 1000);
}

module.exports = new cmd(execute, {
  description: `I'll delete messages for you!`,
  dirname: __dirname,
  usage: `<number of messages to delete | all> <Optional: Mention a User to only delete the messages of>`,
  aliases: [`purge`, `clr`],
  perms: ["MANAGE_MESSAGES"],
});
