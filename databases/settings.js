const mongoose = require("mongoose")

let SettingsSchema = new mongoose.Schema({
  Guild: String & Number,
  
  Settings: {
    Prefix: String,

    WelcomeSettings: {
      WelcomeEnabled: Boolean,
      WelcomeMessage: String,
      WelcomeChannelID: Number
    },
  }
});

const MessageModel = module.exports = mongoose.model("Settings", SettingsSchema)