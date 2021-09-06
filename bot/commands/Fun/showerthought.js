const RedditCommand = require("../../templates/redditCommand");

module.exports = new RedditCommand({
  description: "I will say whatever you want me to say.",
  dirname: __dirname,
  aliases: ["thought"],
  usage: "",
  enabled: true,
  endpoint: "/r/showerthoughts/top/.json?sort=top&t=week",
  type: "text",
});
