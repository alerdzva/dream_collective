module.exports = function(app) {
  var topic = require('../controllers/TopicController');

  // project Routes
  app.route('/topics')
    .get(topic.listAllTopics)
    .post(topic.createTopic);

  app.route('/topics/:topicId')
    .get(topic.readTopic)
    .put(topic.updateTopic)
    .delete(topic.deleteTopic);

};
