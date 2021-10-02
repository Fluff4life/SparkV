const Discord = require("discord.js");

module.exports = {
  once: false,
  async execute(bot, guild) {
    console.log(`SparkV has been added to ${guild.name} (Id: ${guild.id}).`);

    const Logger = bot.channels.cache.get("831314946624454656");

    if (Logger) {
      const ServerAddedEmbed = new Discord.MessageEmbed()
        .setTitle("🔼︱Guild Added")
        .setDescription(`SparkV has joined **${guild.name} (${guild.id})**!`)
        .setColor("GREEN");

      Logger.send({
        embeds: [ServerAddedEmbed]
      });
    }

    let MutedRole = guild.roles.cache.find(r => r.name.toLowerCase().includes("muted"));

    if (!MutedRole) {
      try {
        MutedRole = await guild.roles.create({
          data: {
            name: "Muted",
            permissions: [],
          },
        });

        for (const channel of guild.channels.cache.values()) {
          try {
            if (channel.viewable && channel.permissionsFor(guild.me).has("MANAGE_ROLES")) {
              if (channel.type === "text") {
                await channel.updateOverwrite(MutedRole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                });
              } else if (channel.type === "voice" && channel.editable) {
                await channel.updateOverwrite(MutedRole, {
                  SPEAK: false,
                  STREAM: false,
                });
              }
            }
          } catch (err) {}
        }
      } catch (err) {}
    }

    if (
      guild.systemChannel &&
      guild.systemChannel.permissionsFor(bot.user).has("SEND_MESSAGES") &&
      guild.systemChannel.permissionsFor(bot.user).has("VIEW_CHANNEL")
    ) {
      try {
        const InviteButton = new Discord.MessageButton().setURL(bot.config.bot_invite).setLabel("Bot Invite")
.setStyle("LINK");

        const SupportButton = new Discord.MessageButton()
          .setURL(bot.config.support.invite)
          .setLabel("Support Invite")
          .setStyle("LINK");

        const VoteButton = new Discord.MessageButton()
          .setURL("https://top.gg/bot/763126208149585961")
          .setLabel("Review/Vote for me!")
          .setStyle("LINK");

        await guild.systemChannel.send({
          content:
            "Hi! My name's SparkV. I'm a powerful multipurpose meme/chat bot with over 100+ commands to keep your server entertained and active! All, without spending a dime. Simply use the command ^Help to get a list of my commands. Want to enable a setting? Go to my dashboard! Use the command ^Dashboard and click on the link I send you. Thanks for inviting me!\n\nPsst... don't froget to review me on top.gg!",
          components: [new MessageActionRow().addComponents(InviteButton, SupportButton, VoteButton)],
        });
      } catch {
        console.log(`Failed to send message to ${guild.name} (${guild.id})!`);
      }
    }
  },
};
