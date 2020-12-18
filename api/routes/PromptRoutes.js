module.exports = function(app) {
  var prompt = require("../controllers/PromptController");

  // prompt Routes
  app
    .route("/prompts")
    .get(prompt.listAllPrompts)
    .post(prompt.createPrompt);

  app
    .route("/prompts/:promptId")
    .get(prompt.readPrompt)
    .put(prompt.updatePrompt)
    .delete(prompt.deletePrompt);
  
  app.route("/prompts/topic/:topicId").get(prompt.listAllPromptsOfTopic);
};
