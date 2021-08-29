const RedditCommand = require("../../templates/redditCommand");

module.exports = new RedditCommand({
  description: "Take an advice from an animal!",
  aliases: ["animaladvice", "aadvice", "animala"],
  usage: "",
  enabled: true,
  endpoint: "/r/AdviceAnimals/top/.json?sort=top&t=week",
  type: "image",
});
