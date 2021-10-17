const Discord = require("discord.js");

const cmd = require("../../templates/command");

module.exports = new cmd(
    async (bot, message, args, command, data) => {
        if (!args[1]) args[1] = 1;

        if (isNaN(args[1])) return await message.replyT("That's not a valid number for the quantity of the item you want to buy.");

        args[0] = args[0].toLowerCase();
        args[1] = parseInt(args[1]);

        if (!bot.shop.some(i => i.ids.includes(args[0]))) return await message.replyT("That's not an item you can buy in shop!");

        let itemName = args[0];
        let amount = args[1];

        const item = bot.shop.find(i => i.ids.includes(itemName));

        if (!item.sale) return await message.replyT("This item is not for sale right now.");

        if (data.user.money.balance < item.price) return await message.reply("You don't have enough money to buy this item!");

        data.user.money.balance -= item.price;
        data.user.markModified("money.balance");

        if (!data.user.inventory[item.name]) data.user.inventory[item.name] = 0;

        data.user.inventory[item.name] = parseInt(data.user.inventory[item.name]) + amount;
        data.user.markModified(`inventory.${item.name}`);
        await bot.user.save();

        await message.replyT(`Successfully bought ${item.name} for ${amount}!`);
    },
    {
        description: "Buy an item from the shop.",
        dirname: __dirname,
        aliases: ["job"],
        usage: ``,
    },
);
