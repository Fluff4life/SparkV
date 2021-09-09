const Discord = require(`discord.js`);

const cmd = require("../../templates/command");
const results = [`WIN`, `LOST`];

async function execute(bot, message, args, command, data) {
  const User = (await bot.GetMember(message, args)) || bot.users.cache.get(args[0]);

  if (!User) {
    return message.reply(`${bot.config.bot.Emojis.error} | Please say a person to rob.`);
  }

  var RobberCh1llBucks = data.user.money.balance;
  var UserBalance = await bot.database.fetchUser(User.id);
  var UserCh1llBucks = UserBalance.money.balance;

  if (RobberCh1llBucks < 500) {
    return message.reply(
      `${bot.config.bot.Emojis.error} | Bruh you cannot rob someone unless you have over ❄500 Ch1llBucks.`,
    );
  }

  if (UserCh1llBucks <= 0 || UserCh1llBucks === null) {
    return message.reply(`${bot.config.bot.Emojis.error} | Bruh they have no Ch1llBucks leave them alone you noob!`);
  }

  if (message.author.id === User.id) {
    return message.reply(`${bot.config.bot.Emojis.error} | Why do you want to rob yourself lol.`);
  }

  if (User.id === process.env.OWNERID) {
    return message.reply(
      `${bot.config.bot.Emojis.error} | This user is protected! You can buy a protection shield from being robbed in the shop.`,
    );
  }

  if (UserCh1llBucks < 0) {
    return message.reply(
      `${bot.config.bot.Emojis.error} | This user is in **DEBT**! LOL!! HOW ON EARTH DID THAT HAPPEN LMFAOOOOO!!! Anyways, contact support and we'll reset your balance. :)`,
    );
  }

  const Result = results[Math.floor(Math.random() * results.length)];

  if (Result === `WIN`) {
    const Ammount = Math.floor(Math.random() * UserCh1llBucks);

    data.user.money.balance = RobberCh1llBucks + Ammount;
    UserBalance.money.balance = UserCh1llBucks - Ammount;

    await data.user.save();
    UserBalance.save();

    message.reply(
      `${bot.config.bot.Emojis.success} | You robbed ${User} and recieved ${await bot.functions.FormatNumber(
        Ammount,
      )} Ch1llBucks!`,
    );
  } else {
    data.user.money.balance = RobberCh1llBucks - 250;
    UserBalance.money.balance = UserCh1llBucks + 250;

    await data.user.save();
    UserBalance.save();

    message.reply(`${bot.config.bot.Emojis.error} | LOL you got caught! You payed ❄250 to ${User}.`);
  }
}

module.exports = new cmd(execute, {
  description: `why u bully me?`,
  dirname: __dirname,
  usage: `<user>`,
  aliases: [],
  perms: ["EMBED_LINKS"],
});