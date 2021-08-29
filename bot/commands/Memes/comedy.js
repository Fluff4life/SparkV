const RedditCommand = require("../../templates/redditCommand");

module.exports = new RedditCommand({
  description: "The place for comedy memes from r/ComedyCemetery!",
  aliases: ["doi", "dinternet", "dosei"],
  usage: "",
  enabled: true,
  endpoint: "/r/ComedyCemetery/top/.json?sort=top&t=week",
  type: "image",
});
