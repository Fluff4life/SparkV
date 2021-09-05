const RedditCommand = require("../../templates/redditCommand");

module.exports = new RedditCommand({
  description: "Awww cute bunny!",
  aliases: ["cuteanimal"],
  usage: "",
  enabled: true,
  endpoint: "/r/bunnies/top/.json?sort=top&t=week",
  type: "image",
});
