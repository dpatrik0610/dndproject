const listEndpoints = require('express-list-endpoints');

const logEndpoints = (app) => {
  const routes = listEndpoints(app);
  const endpointList = routes.map((route) => ({
    path: route.path,
    methods: route.methods.join(', '),
  }));

  return endpointList;
};

module.exports = logEndpoints;
