const RedditCommand = require("../../templates/redditCommand");

module.exports = new RedditCommand({
	description: "Meme but SUPER dank. Only the funnyiest memes.",
	dirname: __dirname,
	aliases: ["doi", "dinternet", "dosei"],
	usage: "",
	enabled: true,
	endpoint: "/r/dankmemes/top/.json?sort=top&t=week",
	type: "image",
});
