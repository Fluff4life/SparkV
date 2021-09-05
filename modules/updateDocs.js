/* eslint-disable valid-jsdoc */
const fs = require("fs");
const mtable = require("markdown-table");
const path = require("path");

module.exports = {
  /**
   * Update the docs
   * @param {Object} bot The Ch1llBlox bot Instance.
   */
  update(bot, MainDir) {
	let cmdCount = 0;

	bot.commands.forEach(() => ++cmdCount);

	let baseText = `# Commands\nCh1llBlox's Command List! Ch1llBlox contains more than **${Math.floor(cmdCount)} commands**!\n\n`;

	console.log(bot.commands);
	console.log(bot.categories);

	bot.categories.sort((a, b) => {
		const aCmds = bot.commands.filter(c => {
			if (c) {
				return c.category === a;
			}
		});

		const bCmds = bot.commands.filter(c => {
			if (c) {
				return c.category === b;
			}
		});

		console.log(aCmds, bCmds);
		if (aCmds.length > bCmds.length) {
			return -1;
		} else {
			return 1;
		}
	}).forEach(cat => {
		const info = ["Name", "Description", "Usage", "Cooldown"];
		const cmds = bot.commands.filter(cmd => {
			if (cmd) {
				return cmd.category === cat;
			}
		});

		baseText += `### ${cat}\n\n`;

		cmds.sort((a, b) => {
			if (a.settings.name < b.settings.name) {
				return -1;
			} else {
				return 1;
			}
		}).forEach(cmd => {
			info.push([
				`**${cmd.settings.name || "Command name invalid."}**`,
				cmd.settings.description || "No description for this command",
				cmd.settings.usage || "",
				`${Math.ceil(cmd.settings.cooldown || 3 * 1000)} seconds`
			]);
		});

		baseText += `${mtable(info)}\n\n`;
	});

	fs.writeFileSync(path.join(`${MainDir}/docs/commands.md`), baseText);
	console.log("📋 | Successfully updated commands!");
  },
};
