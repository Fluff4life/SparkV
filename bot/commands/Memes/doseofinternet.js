const RedditCommand = require("../../templates/redditCommand");

module.exports = new RedditCommand({
  description: "I'll send a dose of the internet.",
  aliases: ["doi", "dinternet", "dosei"],
  usage: "",
  enabled: true,
  endpoint: "/top/.json?sort=top&t=week",
  type: "image",
});
