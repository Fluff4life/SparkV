const fs = require("fs");

const commands = fs
  .readdirSync(__dirname)
  .filter(c => c !== "index.js")
  .map(c => require(`${__dirname}/${c}`));

module.exports = {
  name: "😂 Memey",
  description: "A gift from Ch1llBlox. The best memes on reddit right now.",
  commands,
};
