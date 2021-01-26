const Discord = require("discord.js");

(exports.run = async (Bot, msg, suffix) => {
 /*
		Eval Command by SunburntRock89 (https://github.com/SunburntRock89)
	*/
  
	const embed1 = new Discord.MessageEmbed();
  
	if (!process.env.Admins.includes(msg.author.id)) {
		embed1.setDescription("You don't have permissions to run this command! ⚠️")
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed1 });
	}

	try {
		const embed2 = new Discord.MessageEmbed();
		const embed3 = new Discord.MessageEmbed();
		const embed4 = new Discord.MessageEmbed();
    
    //suffix = suffix.join()
    
		if (msg.content.startsWith("```js") && msg.content.endsWith("```")) 
      suffix = suffix.substring(5, suffix.length - 3);
    
		const asyncify = code => `(async () => {\nreturn ${code.trim()}\n})()`;
		let result = await eval(asyncify(suffix));
    
		if (typeof result !== "string") result = require("util").inspect(result, false, 1);
    
		const array = [
			Bot.token.escapeRegex(),
			process.env.token.escapeRegex(),
		];
    
		const regex = new RegExp(array.join("|"), "g");
    
		result = result.replace(regex, "Nice try.");
    
		if (suffix.length == 0) {
			embed2.setDescription("You need to input something to evaluate!")
				.setColor("#FF6347");
			return msg.channel.send({ embed: embed2 });
		}
    
		embed3.setDescription(`${"Code executed successfully. ✅ ```js\n"}${result}\`\`\``)
			.setColor("#00FA9A");
    
		msg.channel.send({ embed: embed3 });
    
	} catch (err) {
		const embed4 = new Discord.MessageEmbed();
		embed4.setDescription(`${"There seemed to have been an error executing that code, take a look: ⚠️ \n ```js\n"}${err}\`\`\``)
			.setColor("#FF6347");
		return msg.channel.send({ embed: embed4 });
	}
}),
  (exports.config = {
    enabled: true,
    guild_only: false,
    aliases: [],
    mod_only: false
  }),
  (exports.help = {
    name: "Eval",
    description: "This is used so Bot Admins can debug me if I have a problem.",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 0
  });
