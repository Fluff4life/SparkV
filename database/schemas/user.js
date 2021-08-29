const mongoose = require("mongoose");

const config = require("../../globalconfig.json");

function GenerateToken() {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzy0123456789.-_";
    let token = "CS-";

    for (let i = 0; i < 32; i++) {
        token += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return token;
}

const Schema = new mongoose.Schema({
<<<<<<< HEAD
  // User //
  id: { type: String },

  // Information //
  bio: { type: String },
  birthday: { type: Number },

  // Stats //
  registrationDate: { type: Number, default: Date.now() },

  // Data //
  APIToken: { type: String, default: GenerateToken() },
  cooldowns: { type: String, default: null },
  afk: { type: String, default: null },
  money: {
    type: Object,
    default: { balance: 0, bank: 0, bankMax: 1000, multiplier: 1 },
  },
=======
    // User //
    id: { type: String },

    // Information //
    bio: { type: String },
    birthday: { type: Number },

    // Stats //
    registrationDate: { type: Number, default: Date.now() },

    // Data //
    APIToken: { type: String, default: GenerateToken() },
    cooldowns: { type: String, default: null },
    afk: { type: String, default: null },
    money: {
        type: Object,
        default: { balance: 0, bank: 0, bankMax: 1000, multiplier: 1 },
    },
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
});

Schema.method("GenerateAPIToken", async () => {
    this.APIToken = GenerateToken();

    await this.save();
    return this.APIToken;
});

module.exports = mongoose.model("User", Schema);
