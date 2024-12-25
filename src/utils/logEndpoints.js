const listEndpoints = require('express-list-endpoints');
const { logTemplates } = require('../utils/logTemplates');

const logEndpoints = (app) => {
  const routes = listEndpoints(app);

  logTemplates.info("Available endpoints:");

  routes.forEach((route) => {
    const methods = route.methods.join(', ');
    logTemplates.info(`${route.path} [${methods}]`);
  });
};

module.exports = logEndpoints;
