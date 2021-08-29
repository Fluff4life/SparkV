const mongoose = require("mongoose");

const config = require("../../globalconfig.json");

const Schema = new mongoose.Schema({
    id: { type: String },
    registrationDate: { type: Number, default: Date.now() },

    // Data //
    members: { type: Object, default: {} },
    casesCount: { type: Number, default: 0 },
    ignoredChannels: { type: Array, default: [] },
    customCommands: { type: Array, default: [] },
    commands: { type: Array, default: [] },
    autoRemoveCommands: { type: Boolean, default: false },

<<<<<<< HEAD
  // Guild Settings //
  settings: {
    type: Object,
    default: {
      prefix: "^",
      welcome: {
        enabled: false,
        channel: null,
        message: null,
        image: null,
        embed: false,
      },
      goodbye: {
        enabled: false,
        channel: null,
        message: null,
        image: null,
        embed: false,
      },
      language: "US-en",
      autorole: {
        enabled: false,
        role: null,
      },
      automod: {
        removeLinks: false,
        removeProfanity: false,
        removeDuplicateText: false,
        ignored: [],
      },
      leveling: {
        enabled: false,
        max: 25,
        min: 5,
      },
      chatbot: null,
      warnsInfractions: {
        kick: false,
        ban: false,
      },
      suggestions: false,
      modlogs: false,
      reports: false,
=======
    // Guild Settings //
    settings: {
        type: Object,
        default: {
            prefix: "^",
            welcome: {
                enabled: false,
                channel: null,
                message: null,
                image: null,
                embed: false,
            },
            goodbye: {
                enabled: false,
                channel: null,
                message: null,
                image: null,
                embed: false,
            },
            language: "US-en",
            autorole: {
                enabled: false,
                role: null,
            },
            automod: {
                removeLinks: false,
                removeProfanity: false,
                removeDuplicateText: false,
                ignored: [],
            },
            leveling: {
                enabled: false,
                max: 25,
                min: 5,
            },
            chatbot: null,
            warnsInfractions: {
                kick: false,
                ban: false,
            },
            suggestions: false,
            modlogs: false,
            reports: false,
        },
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
    },
});

module.exports = mongoose.model("Guild", Schema);
