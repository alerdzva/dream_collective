var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var topicSchema = new Schema({
  name: {type: String},

  description: {type: String},
  
  category: { type: Number},

  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  createdDate: {
    type: Date,
    default: Date.now
  },

  isPublished: {
    type: Boolean,
    default: false
  },

  image: {
    data: Buffer, contentType: String }
});

module.exports = mongoose.model('Topic', topicSchema);
