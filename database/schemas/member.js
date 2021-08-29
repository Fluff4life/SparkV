const mongoose = require("mongoose");

const config = require("../../globalconfig.json");

const Schema = new mongoose.Schema({
<<<<<<< HEAD
  // User Information //
  id: { type: String },
  guildID: { type: String },

  // Information //
  bio: { type: String },
  birthday: { type: Number },

  // Stats //
  registrationDate: { type: Number, default: Date.now() },

  // Data //
  cooldown: { type: Number, default: null },
  afk: {
    type: Object,
    default: { enabled: false, reason: "No reason supplied." },
  },

  money: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
  bankSpace: { type: Number, default: 1000 },

  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },

  infractions: { type: Array, default: [] },
  mute: {
    type: Object,
    default: { muted: false, case: null, endDate: null },
  },
=======
    // User Information //
    id: { type: String },
    guildID: { type: String },

    // Information //
    bio: { type: String },
    birthday: { type: Number },

    // Stats //
    registrationDate: { type: Number, default: Date.now() },

    // Data //
    cooldown: { type: Number, default: null },
    afk: {
        type: Object,
        default: { enabled: false, reason: "No reason supplied." },
    },

    money: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    bankSpace: { type: Number, default: 1000 },

    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },

    infractions: { type: Array, default: [] },
    mute: {
        type: Object,
        default: { muted: false, case: null, endDate: null },
    },
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
});

Schema.method("GenerateAPIToken", async () => {
    this.APIToken = GenerateToken();

    await this.save();
    return this.APIToken;
});

module.exports = mongoose.model("Member", Schema);
