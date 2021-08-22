'use strict';

/**
 * Server module
 * @module server
 * @description This server is used to serve client apps from inside of a docker container when client apps are dockerized.
 */

/**
 * Set process title.
 */
process.title = 'simple-production-server';

/**
 * Server usage examples.
 */
const usageExamples = `
##
# SIMPLE PRODUCTION SERVER FOR CLIENT APPS
# USAGE EXAMPLES
#
# SERVE A SPECIFIC APP
# - command: node server.prod.js <APP_ALIAS>
# - description: to start a specific app by it's alias provide an argument with application name as in ./apps/ directory relative to project root.
#
# SERVE THE DEFAULT APP
# - command: node server.prod.js
# - description: starts server serving default application - client dist.
#
# SERVE DOCUMENTATION APP
# - command: node server.prod.js documentation
# - description: starts server serving documentation app dist.
#
# SERVE ELEMENTS APP
# - command: node server.prod.js elements
# - description: starts server serving elements app dist.
##
`;

/**
 * @name cwd
 * @constant
 * @summary Current directory of the main Server script - simple-production-server.js
 * @description Correct root path for all setups, it should be used for all file references for the server and its modules like filePath: cwd + '/actual/file.extension'. Built Electron app contains actual app in resources/app(.asar) subdirectory, so it is essential to prefer __dirname usage over process.cwd() to get the value.
 */
const cwd = __dirname;

/**
 * @name express
 * @constant
 * @summary Express server
 * @description Express server
 */
const express = require('express');

/**
 * @name compression
 * @constant
 * @summary Compression for Express server
 * @description Compression for Express server
 */
const compression = require('compression');

/**
 * @name app
 * @constant
 * @summary Express application
 * @description Express application
 */
const app = express();

/**
 * @name fs
 * @constant
 * @summary filesystem api
 * @description filesystem api
 */
const fs = require('fs');

/**
 * Use compression for all responses.
 */
app.use(
  compression({
    threshold: 0,
    level: -1,
  }),
);

/**
 * @name config
 * @summary Configuration variables
 * @description Production server configuration variables object
 */
const config = {
  appNameArg: 2,
  defaultPort: 8080,
  httpSuccessStatus: 200,
};

/**
 * Served application name.
 */
const servedAppName = process.argv[config.appNameArg] || 'client';

/**
 * Application distributive path.
 */
const appDistPath = !/-e2e$/.test(servedAppName) ? `${cwd}/dist/apps/${servedAppName}` : `${cwd}/dist/cypress/apps/${servedAppName}`;

/**
 * Application distributive existence condition.
 */
const distExists = fs.existsSync(appDistPath);

if (!distExists) {
  const err = new Error(`path ${appDistPath} does not exist`);
  throw err;
}

/**
 * Headers config for all Express api routes.
 */
app.all('/*', function (req, res, next) {
  /** CORS headers */
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain if needed
  res.header('Allow', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-type,Content-Length,Accept,X-Access-Token,X-Key,X-Auth-Token,X-Requested-With,Authorization',
  );
  /** Additional exposed headers */
  res.header('Access-Control-Expose-Headers', 'Views,X-Auth-Token');
  /** Cache control */
  res.header('Cache-Control', 'public, no-cache, no-store, must-ravalidate, max-age=0');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  /** Handle OPTIONS method */
  if (req.method === 'OPTIONS') res.status(200).end();
  else next();
});

/**
 * Serve public directory.
 */
app.use('/', express.static(appDistPath));

/**
 * Serve app index file for paths excluding provided in regX.
 */
app.use((req, res, next) => {
  /**
   * This is required for angular to load urls properly when user requests url directly, e.g.
   * current conditions: client index page is served fro all request
   * which do not include control strings.
   */
  const regX = /(assets|webmanifest|js|css|json|ico|svg|woff|woff2|ttf|eot)/;

  if (regX.test(req.path)) {
    return next();
  }
  res.sendFile(`${appDistPath}/index.html`);
});

/**
 * @name port
 * @summary Application port
 * @description Server exposes this port when started
 */
const port = process.env.PORT || config.defaultPort;

/**
 * Server start message.
 */
const serverStartedMessage = `
##
# SIMPLE PRODUCTION SERVER
# SERVEED
#
# - serving dist: ${appDistPath}
# - listening on port: ${port}
##
`;

app.listen(port, () => {
  // eslint-disable-next-line no-console -- needed here for debugging
  console.log(usageExamples, '\n', serverStartedMessage);
});

/**
 * @function terminator
 * @summary Terminator function
 * @description Terminates application
 */
function terminator(sig) {
  if (typeof sig === 'string') {
    // eslint-disable-next-line no-console -- needed here for debugging
    console.log(`\n${Date(Date.now())}: Received signal ${sig} - terminating app...\n`);
    process.exit(0);
  }
}

/**
 * Termination handlers.
 */
(() => {
  process.on('exit', () => {
    terminator('exit');
  });
  ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'].forEach(
    element => {
      process.on(element, () => {
        terminator(element);
      });
    },
  );
})();
