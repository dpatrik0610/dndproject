const listEndpoints = require('express-list-endpoints');

const logEndpoints = (app) => {
  const routes = listEndpoints(app);
  const endpointList = [];

  routes.forEach((route) => {
    const methods = route.methods.join(', ');
    endpointList.push(`${route.path} [${methods}]`);
  });

  return endpointList;
};

module.exports = logEndpoints;
