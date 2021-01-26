const Discord = require("discord.js");

(exports.run = async (Bot, msg, Arguments) => {
  const DeleteCount = parseInt(Arguments[0], 10);

  if (!msg.member.hasPermission("BAN_MEMBERS")) {
    return msg.reply("Uh oh... You don't have permision to do that!");
  }

  if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
    return msg.reply(
      "You don't have permision to run this command! Try getting a role that has MANAGE_MESSAGES enabled."
    );
  }

  if (!DeleteCount || DeleteCount < 2 || DeleteCount > 100)
    return msg.reply(
      "Please provide a number between 2 and 100 for the number of messages to delete :)"
    );

  const fetched = await msg.channel.messages.fetch({ limit: DeleteCount });

  msg.channel
    .bulkDelete(fetched)
    .then(
      setTimeout(() => {
        msg.channel.send(`Successfully deleted ${DeleteCount} messages!`);
      }, 2000)
    )
    .catch(() => msg.reply(`Uh oh... I couldn't delete these messages!`));
}),
  (exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["purge", "clr"],
    mod_only: false
  }),
  (exports.help = {
    name: "Clear",
    description:
      "I can delete messages for you so you don't have to spend a while deleting them :)",
    usage: "[how many messages to delete]",
    category: "🧰utility🧰",
    cooldown: 3.5
  });
