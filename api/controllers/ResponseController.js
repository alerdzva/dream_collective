var mongoose = require('mongoose'),
  Response = mongoose.model('Response');
  

exports.listAllResponses = function(req, res) {
  Response.find({}, function(err, response) {
    if (err)
      res.send(err);
    res.json(response);
    console.log(response);
  }).sort({createdDate:1}).populate('prompt').populate('features');
};

exports.listAllResponsesOfTopic = function (req, res) {
  Response.find({ topic: req.params.topicId }, function (err, response) {
    if (err) res.send(err);
    res.json(response);
    console.log(response);
  })
    .sort({ createdDate: 1 })
    .populate("prompt")
    .populate("features");
};

exports.createResponse = function(req, res) {
  var newResponse = new Response(req.body);
  newResponse.save(function(err, response) {
    if (err)
      res.send(err);
    console.log(response);
    res.json(response);
  });
};

exports.readResponse = function(req, res) {
  Response.findById(req.params.responseId, function(err, response) {
    if (err)
      res.send(err);
    res.json(response);
  }).populate('prompt').populate('features').populate('topic');
};

exports.updateResponse = function(req, res) {
  Response.findOneAndUpdate({_id: req.params.responseId}, req.body, {new: true}, function(err, response) {
    if (err)
      res.send(err);
    res.json(response);
  });
};

exports.deleteResponse= function(req, res) {
  Response.remove({
    _id: req.params.responseId
  }, function(err, response) {
    if (err)
      res.send(err);
    res.json({message: 'Response successfully deleted', response:response });
  });
};
