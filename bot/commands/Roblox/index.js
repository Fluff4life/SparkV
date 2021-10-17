const fs = require("fs");

const commands = fs
	.readdirSync(__dirname)
	.filter(c => c !== "index.js")
	.map(c => require(`${__dirname}/${c}`));

module.exports = {
	name: "Roblox",
	description: "Roblox commands!",
	emoji: "<:roblox:819679702490808340>",
	commands,
};
