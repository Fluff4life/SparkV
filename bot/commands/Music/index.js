const fs = require("fs");

const commands = fs
	.readdirSync(__dirname)
	.filter(c => c !== "index.js")
	.map(c => require(`${__dirname}/${c}`));

module.exports = {
	name: "Music",
	description: "The power of music - all in a single bot.",
	emoji: "🎵",
	commands,
};
