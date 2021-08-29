const { AutoPoster } = require("topgg-autoposter");

module.exports = async bot => {
    const poster = AutoPoster(process.env.DBLKEY, bot);

    poster.on("error", err => {
        console.log(`TOP.GG POSTING ERROR! => ${err}`);
    });
};
