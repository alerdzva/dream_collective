module.exports = function(app) {
  var feature = require('../controllers/FeatureController');

  // project Routes
  app.route('/features')
    .get(feature.listAllFeatures)
    .post(feature.createFeature);

  app.route('/features/:featureId')
    .get(feature.readFeature)
    .put(feature.updateFeature)
    .delete(feature.deleteFeature);
  
  app
    .route("/features/topic/:topicId")
    .get(feature.listAllFeaturesOfTopic);
};
