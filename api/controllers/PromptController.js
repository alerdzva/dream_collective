var mongoose = require("mongoose"),
  Prompt = mongoose.model("Prompt");

exports.listAllPrompts = function(req, res) {
  Prompt.find({}, function(err, prompt) {
    if (err) res.send(err);
    res.json(prompt);
  });
};

exports.listAllPromptsOfTopic = function (req, res) {
  Prompt.find({ topic: req.params.topicId }, function (err, prompt) {
    if (err) res.send(err);
    res.json(prompt);
  });
};

exports.createPrompt = function(req, res) {
  var newPrompt = new Prompt(req.body);
  newPrompt.save(function(err, prompt) {
    if (err)
      res.send(err);
    res.json(prompt);
  });
};

exports.readPrompt = function(req, res) {
  console.log(req.params.promptId);
  Prompt.findById(req.params.promptId, function(err, prompt) {
    if (err) res.send(err);
    res.json(prompt);
  });
};

exports.updatePrompt = function(req, res) {
  Prompt.findOneAndUpdate(
    { _id: req.params.promptId },
    req.body,
    { new: true },
    function(err, prompt) {
      console.log(prompt);
      if (err) res.send(err);
      res.json(prompt);
    }
  );
};

exports.deletePrompt = function(req, res) {
  Prompt.remove(
    {
      _id: req.params.promptId
    },
    function(err, prompt) {
      if (err) res.send(err);
      res.json({ message: "prompt successfully deleted" });
    }
  );
};