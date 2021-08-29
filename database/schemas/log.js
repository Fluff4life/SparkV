const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
<<<<<<< HEAD
  commandName: { type: String, default: "unknown" },
  user: {
    type: Object,
    default: { username: "unknown", discrminator: "#0000", id: null },
  },
  guild: { type: Object, default: { name: "unknown", id: null } },
  date: { type: Number, default: Date.now() },
=======
    commandName: { type: String, default: "unknown" },
    user: {
        type: Object,
        default: { username: "unknown", discrminator: "#0000", id: null },
    },
    guild: { type: Object, default: { name: "unknown", id: null } },
    date: { type: Number, default: Date.now() },
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
});

module.exports = mongoose.model("Log", Schema);
