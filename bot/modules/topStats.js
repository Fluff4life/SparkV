const DBL = require("dblapi.js");

let stats;

module.exports = {
    /**
     * Initilizes Top.gg Auto Poster and Vote Webhook
     */

    init(bot, DBLKEY, DBLPASS) {
        stats = new DBL(DBLKEY, bot);

        setInterval(() => {
            stats.postStats(bot.guilds.cache.size);
        }, 600 * 1000);

        const dbl = new DBL(DBLKEY, {
            webhookPort: 3001,
            webhookAuth: DBLPASS
        });

        dbl.webhook.on("vote", async vote => {
            const vUser = await bot.users.fetch(vote.user);
            const member = await client.findOrCreateMember({ id: vote.user, guildID: client.config.support.id });

            member.money += 500;
            member.save();

            vUser.send(`Thanks for voting, <@${vUser.id}>! Enjoy your \`500\` coins.`).catch(() => { });

            const logsChannel = client.channels.cache.get(client.config.votes.channel);
            if (logsChannel) {
                logsChannel.send(client.translate("misc:VOTE_LOGS", {
                    userid: dUser.id,
                    usertag: dUser.tag
                }));
            }
        });
    },

    postStats() {
        stats.postStats(bot.guilds.cache.size);
    }
};
