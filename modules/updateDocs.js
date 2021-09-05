const mtable = require("markdown-table");
const fs = require("fs");

module.exports = {
  /**
   * Update the docs
   * @param {Object} bot The Ch1llBlox bot Instance.
   */
  update(bot) {
    let cmdCount = 0;

    bot.commands.forEach(() => ++cmdCount);

    let baseText = `# Commands\nCh1llBlox's Command List! Ch1llBlox contains more than **${Math.floor(
      cmdCount,
    )} commands**!\n\n`;

    bot.categories
      .sort((a, b) => {
        const aCmds = bot.commands.filter(c => c.category === a).array();
        const bCmds = bot.commands.filter(c => c.category === b).array();

        if (aCmds.length > bCmds.length) {
          return -1;
        } else {
          return 1;
        }
      })
      .forEach(cat => {
        const info = ["Name", "Description", "Usage", "Cooldown"];
        const cmds = bot.commands.filter(cmd => cmd.category === cat).array();

        baseText += `### ${cat}\n\n`;

        cmds
          .sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else {
              return 1;
            }
          })
          .forEach(cmd => {
            info.push([
              `**${cmd.name || "Command name invalid."}**`,
              cmd.description || "No description for this command",
              cmd.usage || "",
              `${Math.ceil(cmd.cooldown / 1000)} seconds`,
            ]);
          });

        baseText += `${mtable(info)}\n\n`;
      });

    if (fs.existsSync("../docs")) {
      fs.writeFileSync("../docs/commands.md", baseText);
      console.log("📋 | Successfully updated commands!");
    }
  },
};
