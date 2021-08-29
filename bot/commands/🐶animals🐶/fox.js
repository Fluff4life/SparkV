const animalCommand = require("../../templates/animalCommand");

module.exports = new animalCommand({
    description: "I will send a cute fox! Ducks are cuter.",
    aliases: ["cutefox"],
    usage: "",
    enabled: true,
    endpoint: "https://randomfox.ca/floof/",
    type: "image",
});
