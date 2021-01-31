const mongoose = require("mongoose")

let SettingsSchema = new mongoose.Schema({
  Guild: String & Number,
  
  Settings: {
    Prefix: String,
  }
});

const MessageModel = module.exports = mongoose.model("Settings", SettingsSchema)