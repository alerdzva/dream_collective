module.exports = function(app) {
  var response = require('../controllers/ResponseController');


  app.route('/responses')
    .get(response.listAllResponses)
    .post(response.createResponse);

  app.route('/responses/:responseId')
    .get(response.readResponse)
    .put(response.updateResponse)
    .delete(response.deleteResponse);
  
  app.route("/responses/topic/:topicId").get(response.listAllResponsesOfTopic);
};
