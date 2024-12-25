const chalk = require('chalk');
const signale = require('signale');

// Predefined Chalk Templates
const logTemplates = {
  success: (message) =>
    console.log(chalk.green.bold(`[SUCCESS] ${message}`)),

  error: (message) =>
    console.log(chalk.red.bold(`[ERROR] ${message}`)),

  warning: (message) =>
    console.log(chalk.yellow.bold(`[WARNING] ${message}`)),

  info: (message) =>
    console.log(chalk.blue(`[INFO] ${message}`)),

  critical: (message) =>
    console.log(chalk.bgRed.white.bold(`[CRITICAL] ${message}`)),
};

// Predefined Signale Templates
const logger = new signale.Signale({
  types: {
    debug: {
      badge: '🐛',
      color: 'cyan',
      label: 'debug',
      logLevel: 'debug',
    },
    task: {
      badge: '✅',
      color: 'green',
      label: 'task',
      logLevel: 'info',
    },
    alert: {
      badge: '⚠️',
      color: 'yellow',
      label: 'alert',
      logLevel: 'warn',
    },
  },
});

const signaleTemplates = {
  debug: (message) => logger.debug(message),
  task: (message) => logger.task(message),
  alert: (message) => logger.alert(message),
};

module.exports = {
  logTemplates,
  signaleTemplates,
};
