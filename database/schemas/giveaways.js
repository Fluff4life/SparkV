const mongoose = require("mongoose");

const config = require("../../globalconfig.json");

const Schema = new mongoose.Schema({
    ID: { type: String, default: "giveaways" },
    data: { type: Array, default: [] },
});

module.exports = mongoose.model("Giveaways", Schema);
