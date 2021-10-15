const Discord = require(`discord.js`);

const cmd = require("../../templates/command");
const results = [`WIN`, `LOST`];

async function execute(bot, message, args, command, data) {
  const User = bot.users.cache.get(args[0]);

  if (!User) {
    return await message.replyT(`${bot.config.emojis.error} | Please say a person to rob.`);
  }

  let UserBalance = await bot.database.fetchUser(User.id);

  if (data.user.money.balance < 500) {
    return await message.replyT(
      `${bot.config.emojis.error} | Bruh you cannot rob someone unless you have over ❄500 Ch1llBucks.`,
    );
  }

  if (UserBalance.money.balance <= 0 || UserBalance.money.balance === null) {
    return await message.replyT(`${bot.config.emojis.error} | Bruh they have no Ch1llBucks leave them alone you noob!`);
  }

  if (message.author.id === User.id) {
    return await message.replyT(`${bot.config.emojis.error} | Why do you want to rob yourself lol.`);
  }

  if (User.id === bot.config.ownerID) {
    return await message.replyT(
      `${bot.config.emojis.error} | This user is protected! You can buy a protection shield from being robbed in the shop.`,
    );
  }

  if (UserBalance.money.balance < 0) {
    return await message.replyT(
      `${bot.config.emojis.error} | This user is in **DEBT**! LOL!! HOW ON EARTH DID THAT HAPPEN LMFAOOOOO!!! Anyways, contact support and we'll reset your balance. :)`,
    );
  }

  const Result = results[Math.floor(Math.random() * results.length)];

  if (Result === `WIN`) {
    const Ammount = Math.floor(Math.random() * UserBalance.money.balance);

    data.user.money.balance += Ammount;
    UserBalance.money.balance -= Ammount;

    data.user.markModified("money.balance");
    UserBalance.markModified("money.balance");

    await data.user.save();
    await UserBalance.save();

    await message.replyT(
      `${bot.config.emojis.success} | You robbed ${User} and recieved ${bot.functions.formatNumber(
        Ammount,
      )} Ch1llBucks!`,
    );
  } else {
    data.user.money.balance -= 250;
    UserBalance.money.balance += 250;

    await data.user.save();
    await UserBalance.save();

    await message.replyT(`${bot.config.emojis.error} | LOL you got caught! You payed ❄250 to ${User}.`);
  }
}

module.exports = new cmd(execute, {
  description: `why u bully me?`,
  dirname: __dirname,
  usage: `<user>`,
  aliases: [],
  perms: ["EMBED_LINKS"],
});
