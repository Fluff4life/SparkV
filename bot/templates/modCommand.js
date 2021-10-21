const discord = require("discord.js");
const NewCommand = require("./command");

module.exports = class ModCommand {
	constructor(execute, sett) {
		this.execute = execute;
		this.settings = new NewCommand(execute, Object.assign({ cooldown: 2 * 1000 }, sett)).settings;
	}

	async run(bot, message, args, command, data) {
		for (const requiredPerm of this.settings.perms || []) {
			if (!message.channel.permissionsFor(message.member).has(requiredPerm)) {
				return this.missingPermission("user", requiredPerm);
			} else if (!message.channel.permissionsFor(message.guild.me).has(requiredPerm)) {
				return this.missingPermission("bot", requiredPerm);
			}
		}

		return this.execute(bot, message, args, command, data);
	}

	missingPermission(type, permission) {
		const permissions = {
			kickMembers: "kick members",
			banMembers: "ban members",
			manageChannels: "manage and edit channels",
			manageGuild: "manage and edit server settings",
			manageMessages: "manage and remove messages",
			manageNicknames: "edit other people's nicknames",
			manageRoles: "manage the roles on this server",
		};

		return `Sorry, ${type === "bot" ? "i'm" : "you're"} missing the \`${(
			permission.charAt(0).toUpperCase() + permission.slice(1)
		).replace(/([A-Z])/g, " $1")}\` permission.\nMake sure ${type === "bot" ? "I have" : "you have"} access to **${
			permissions[permission]
		}** and try again.`;
	}
};
