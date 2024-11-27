const listEndpoints = require('express-list-endpoints');
const chalk = require('chalk');

const logEndpoints = (app) => {
  const routes = listEndpoints(app);

  console.log("\nAvailable endpoints:\n");

  routes.forEach((route, index) => {
    const methods = route.methods.join(', ');
    console.log(`  ${chalk.green(index + 1)}. ${chalk.blue(route.path)} [${chalk.yellow(methods)}]`);
  });
};

module.exports = logEndpoints;
