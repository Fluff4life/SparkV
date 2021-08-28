const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    commandName: { type: String, default: "unknown" },
    user: {
        type: Object,
        default: { username: "unknown", discrminator: "#0000", id: null },
    },
    guild: { type: Object, default: { name: "unknown", id: null } },
    date: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("Log", Schema);
