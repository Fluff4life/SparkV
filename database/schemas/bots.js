const mongoose = require("mongoose");

const config = require("../../globalconfig.json");

function GenerateToken() {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzy0123456789.-_";
    let token = "CSBL-";

    for (let i = 0; i < 32; i++) {
        token += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return token;
}

const Schema = new mongoose.Schema({
<<<<<<< HEAD
  id: { type: String },
  username: { type: String },
  summery: { type: String, default: "<p>This bot has no summery.</p>" },
  description: {
    type: String,
    default: "<p>This bot has no description.</p>",
  },
  logo: { type: String, default: null },
  invite: { type: String, default: null },
  prefix: { type: String, default: null },
  support: { type: String, default: null },
  website: { type: String, default: null },
  github: { type: String, default: null },
  webhook: { type: String, default: null },
  tags: { type: Array, default: [] },
  likes: { type: Number, default: 0 },
  owners: {
    main: {
      type: String,
      default: null,
    },
    additional: {
      type: Array,
      default: [],
    },
  },
  auth: { type: String, default: GenerateToken() },
  note: { type: String, default: null },
  state: { type: String, default: "unverified" },
  dateAdded: { type: Number, default: new Date() },
=======
    id: { type: String },
    username: { type: String },
    summery: { type: String, default: "<p>This bot has no summery.</p>" },
    description: {
        type: String,
        default: "<p>This bot has no description.</p>",
    },
    logo: { type: String, default: null },
    invite: { type: String, default: null },
    prefix: { type: String, default: null },
    support: { type: String, default: null },
    website: { type: String, default: null },
    github: { type: String, default: null },
    webhook: { type: String, default: null },
    tags: { type: Array, default: [] },
    likes: { type: Number, default: 0 },
    owners: {
        main: {
            type: String,
            default: null,
        },
        additional: {
            type: Array,
            default: [],
        },
    },
    auth: { type: String, default: GenerateToken() },
    note: { type: String, default: null },
    state: { type: String, default: "unverified" },
    dateAdded: { type: Number, default: new Date() },
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
});

module.exports = mongoose.model("Bots", Schema);
