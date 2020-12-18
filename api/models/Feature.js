var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');



var featureSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  
  topic:{type: mongoose.Schema.Types.ObjectId, ref: 'Topic'},

  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  isFlagged: {
    type: Boolean,
    default: false
  },
  
  createdDate: {
    type: Date,
    default: Date.now
  }
});

featureSchema.plugin(random);

module.exports = mongoose.model('Feature', featureSchema);
