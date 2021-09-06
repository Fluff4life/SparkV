const animalCommand = require("../../templates/animalCommand");

module.exports = new animalCommand({
  description: "Quack :D",
  dirname: __dirname,
  aliases: ["ducc", "cuteduck"],
  usage: "",
  enabled: true,
  endpoint: "https://dog.ceo/api/breeds/image/random",
  type: "image",
});
