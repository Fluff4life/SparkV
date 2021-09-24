const mongoose = require("mongoose");

module.exports = mongoose.model("Prefixes",
    new mongoose.Schema({
        id: { type: String },

        // Data //
        prefix: { type: String, default: "^" }
    })
);
