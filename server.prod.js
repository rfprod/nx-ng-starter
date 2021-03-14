'use strict';

/**
 * Server module
 * @module server
 */

/**
 * Set process title.
 */
process.title = 'simple-production-server';

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
 * Use compression for all responses.
 */
app.use(
  compression({
    threshold: 0,
    level: -1,
  }),
);

/**
 * Serve public directory.
 */
app.use('/', express.static(cwd + '/dist/apps/client'));

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

  console.log('req', req.path);

  if (regX.test(req.path)) {
    return next();
  } else {
    res.sendFile(cwd + '/dist/apps/client/index.html');
  }
});

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
  if (req.method == 'OPTIONS') res.status(200).end();
  else next();
});

/**
 * @name port
 * @summary Application port
 * @description Application port
 */
const port = process.env.PORT || 8080;

app.listen(port, () => {
  const message = `
  # Simple production server started
      > Node.js listening on ${port}...
`;
  console.log(message);
});
