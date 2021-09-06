const RedditCommand = require("../../templates/redditCommand");

module.exports = new RedditCommand({
  description: "I will send a animal pic from multible subreddits.",
  dirname: __dirname,
  aliases: ["cuteanimal"],
  usage: "",
  enabled: true,
  endpoint: "/r/aww/top/.json?sort=top&t=week",
  type: "image",
});
