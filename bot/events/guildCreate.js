const Discord = require("discord.js");

module.exports = {
  once: false,
  async execute(bot, guild) {
    console.log(`SparkV has been added to ${guild.name} (Id: ${guild.id}).`);

    const Logger = bot.channels.cache.get("831314946624454656");

    if (Logger) {
      const ServerAddedEmbed = new Discord.MessageEmbed()
        .setTitle("🔼︱Guild Added")
        .setDescription(`SparkV has joined ${guild.name} (${guild.id})!`)
        .setColor("GREEN");

      Logger.send(ServerAddedEmbed);
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

    try {
      const SelfRole = guild.roles.cache.find(role => role.name === "SparkV");

      if (SelfRole) {
        SelfRole.setColor("BLUE");
      }
    } catch (err) {}

    if (
      guild.systemChannel &&
      guild.systemChannel.permissionsFor(bot.user).has("SEND_MESSAGES") &&
      guild.systemChannel.permissionsFor(bot.user).has("VIEW_CHANNEL")
    ) {
      try {
        const InviteButton = new MessageButton().setURL(bot.config.bot_invite).setLabel("Bot Invite")
.setStyle("LINK");

        const SupportButton = new MessageButton()
          .setURL(bot.config.support.invite)
          .setLabel("Support Invite")
          .setStyle("LINK");

        const VoteButton = new MessageButton()
          .setURL("https://top.gg/bot/763126208149585961")
          .setLabel("Vote for me!")
          .setStyle("LINK");

        await guild.systemChannel.send({
          content:
            "Hi! My name's SparkV. I'm a bot with over 100+ commands to assist you with keeping you entertained and your server active! Simply use the command ^Help to get a list of my commands. Want to enable a setting? Go to my dashboard! Use the command ^Dashboard and click on the link I send you. Thanks for inviting me!",
          components: [new MessageActionRow().addComponents(InviteButton, SupportButton, VoteButton)],
        });
      } catch {
        console.log(`Failed to send message to ${guild.name} (${guild.id})!`);
      }
    }
  },
};
