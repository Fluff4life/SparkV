const { Message } = require("discord.js");
const translate = require("@vitalets/google-translate-api");

Message.prototype.translate = async function(content) {
    // Native languge
    if (this.guild.data.language === "en") {
        return content;
    }

    const cache = await this.client.redis.getAsync(`${content}-${this.guild.data.language}`).then(res => JSON.parse(res));
    let translation;

    if (cache) {
        translation = cache;
    } else {
        let content1, content2;

        if (content.includes(" | ")) {
            content1 = content.split(" | ")[0];
            content2 = content.split(" | ")[1];
        }

        await translate(content2, { to: this.guild.data.language }).then(res => {
            console.log(res.text);
            if (content.includes(" | ")) {
                translation = `${content1} | ${res.text}`;
            } else {
                translation = res.text;
            }
        }).catch(err => console.error(err));

        this.client.redis.setAsync(`${content}-${this.guild.data.language}`, JSON.stringify(translation), "EX", 15 * 60);
    }

    return translation;
};

Message.prototype.replyT = async function(options) {
    if (typeof options === "string") {
        let newOptions = {};
        newOptions.content = options;

        options = newOptions;
    }

    if (options.content) {
        // Native languge.
        if (this.guild.data.language === "en") {
            return this.reply(options.content);
        }

        // Can translate string.
        const cache = await this.client.redis.getAsync(`${options.content}-${this.guild.data.language}`).then(res => JSON.parse(res));
        let translation;

        if (cache) {
            translation = cache;
        } else {
            translation = await this.translate(options.content);

            this.client.redis.setAsync(`${options.content}-${this.guild.data.language}`, JSON.stringify(translation), "EX", 15 * 60);
        }

        this.reply(translation);
    } else {
        // Cannot do anything.
        this.reply(options);
    }
};
