var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');



var responseSchema = new Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },

  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },

  features: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feature" }],

  inputs: [
    {
      prompt: { type: mongoose.Schema.Types.ObjectId, ref: "Prompt" },
      text: { type: String },
    },
  ],

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  isFlagged: {
    type: Boolean,
    default: false,
  },

  isPublished: {
    type: Boolean,
    default: false,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

responseSchema.plugin(random);

module.exports = mongoose.model('Response', responseSchema);
