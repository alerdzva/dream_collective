var mongoose = require('mongoose'),
  Topic = mongoose.model('Topic');


exports.listAllTopics = function(req, res) {

  Topic.find({}, function (err, topic) {
    if (err) res.send(err);
    res.json(topic);
    console.log(topic);
  })
    .sort({ createdDate: -1 })
    .populate("prompts")
    .populate("createdBy");
};

exports.createTopic = function(req, res) {
  var newTopic = new Topic(req.body);
  newTopic.save(function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.readTopic = function(req, res) {
  Topic.findById(req.params.topicId, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  }).populate('prompts').populate('createdBy').
  populate('prompts').populate({path:'activities', populate: {path:'user'}});
};

exports.updateTopic= function(req, res) {
  Topic.findOneAndUpdate({_id: req.params.topicId}, req.body, {new: true}, function(err, topic) {
    if (err)
      res.send(err);
    res.json(topic);
  });
};

exports.deleteTopic = function(req, res) {
  Topic.remove({
    _id: req.params.topicId
  }, function(err, topic) {
    if (err)
      res.send(err);
    res.json({ message: 'topic successfully deleted', topic:topic});
  });
};
