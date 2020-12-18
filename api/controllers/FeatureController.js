var mongoose = require('mongoose'),
  Feature = mongoose.model('Feature');

exports.listAllFeatures = function(req, res) {
  Feature.find({}, function(err, feature) {
    if (err)
      res.send(err);
    res.json(feature);
    console.log(feature);
  }).sort({createdDate:-1}).populate('createdBy');
};

exports.listAllFeaturesOfTopic = function (req, res) {
  Feature.find({ topic: req.params.topicId }, function (err, feature) {
    if (err) res.send(err);
    res.json(feature);
    console.log(feature);
  })
    .sort({ createdDate: -1 })
    .populate("createdBy");
};

exports.createFeature = function(req, res) {
  var newFeature = new Feature(req.body);
  newFeature.save(function(err, feature) {
    if (err)
      res.send(err);
    console.log(feature);
    res.json(feature);
  });
};

exports.readFeature = function(req, res) {
  console.log(req.params.featureId);
  Feature.findById(req.params.featureId, function(err, feature) {
    if (err)
      res.send(err);
    res.json(feature);
  }).populate('createdBy');
};

exports.updateFeature = function(req, res) {
  Feature.findOneAndUpdate({_id: req.params.featureId}, req.body, {new: true}, function(err, feature) {
    if (err)
      res.send(err);
    res.json(feature);
  });
};

exports.deleteFeature = function(req, res) {
  Feature.remove({
    _id: req.params.featureId
  }, function(err, feature) {
    if (err)
      res.send(err);
    res.json({message: 'Feature successfully deleted', feature:feature});
  });
};

