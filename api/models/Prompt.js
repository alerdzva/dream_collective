var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var promptSchema = new Schema({
  text: {
    type: String
  },

  startingLine: {
    type: String
  },

  topic:{type: mongoose.Schema.Types.ObjectId, ref: 'Topic'},

  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prompt', promptSchema);
