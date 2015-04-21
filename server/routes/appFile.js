var config = require('./../config.js');
exports.addRoutes = function(app) {
  // This route deals enables HTML5Mode by forwarding missing files to the index.html
  app.get('/*', function(req, res) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile('index.html', { root: config.server.distFolder });
  });
};