const chalk = require('chalk');

// Predefined Chalk Templates
const logger = {
  success: (message) =>
    console.log(chalk.green.bold(`✅ [SUCCESS] ${message}`)),

  error: (message) =>
    console.log(chalk.red.bold(`❌ [ERROR] ${message}`)),

  warning: (message) =>
    console.log(chalk.yellow.bold(`⚠️ [WARNING] ${message}`)),

  info: (message) =>
    console.log(chalk.blue(`[INFO] ${message}`)),

  critical: (message) =>
    console.log(chalk.bgRed.white.bold(`🚨 [CRITICAL] ${message}`)),

  debug: (message) =>
    console.log(chalk.whiteBright(`🐛 [DEBUG] ${message}`))
};

module.exports = {
  logger,
};
