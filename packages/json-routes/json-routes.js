/* global JsonRoutes:true */

var express = Npm.require('express');
var bodyParser = Npm.require('body-parser');
var query = Npm.require('connect-query');

JsonRoutes = {};

// Override default request size
WebApp.handlers.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
WebApp.handlers.use(bodyParser.json({ limit: '50mb' }));
WebApp.handlers.use(query());

// Handler for adding middleware before an endpoint.
// Also serves as a namespace for middleware packages to declare their middleware functions.
JsonRoutes.Middleware = express();
WebApp.handlers.use(JsonRoutes.Middleware);

// List of all defined JSON API endpoints
JsonRoutes.routes = [];

// Save reference to router for later
var expressRouter = express.Router();

// Register as a middleware
WebApp.handlers.use(expressRouter);

// Error middleware must be added last, to catch errors from prior middleware.
// That's why we cache them and then add after startup.
var errorMiddlewares = [];
JsonRoutes.ErrorMiddleware = {
  use: function () {
    errorMiddlewares.push(arguments);
  },
};

Meteor.startup(function () {
  _.each(errorMiddlewares, function (errorMiddleware) {
    errorMiddleware = _.map(errorMiddleware, function (maybeFn) {
      if (_.isFunction(maybeFn)) {
        // Express error middleware needs exactly 4 arguments because they use fn.length === 4 to
        // decide if something is an error middleware.
        return function (err, req, res, next) {
          maybeFn(err, req, res, next);
        }
      }

      return maybeFn;
    });

    WebApp.handlers.use.apply(WebApp.handlers, errorMiddleware);
  });

  errorMiddlewares = [];
});

JsonRoutes.add = function (method, path, handler) {
  // Make sure path starts with a slash
  if (path[0] !== '/') {
    path = '/' + path;
  }

  // Add to list of known endpoints
  JsonRoutes.routes.push({
    method: method,
    path: path,
  });

  expressRouter[method.toLowerCase()](path, async function (req, res, next) {
    // Set headers on response
    setHeaders(res, responseHeaders);
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  });
};

var responseHeaders = {
  'Cache-Control': 'no-store',
  Pragma: 'no-cache',
};

JsonRoutes.setResponseHeaders = function (headers) {
  responseHeaders = headers;
};

/**
 * Sets the response headers, status code, and body, and ends it.
 * The JSON response will be pretty printed if NODE_ENV is `development`.
 *
 * @param {Object} res Response object
 * @param {Object} [options]
 * @param {Number} [options.code] HTTP status code. Default is 200.
 * @param {Object} [options.headers] Dictionary of headers.
 * @param {Object|Array|null|undefined} [options.data] The object to
 *   stringify as the response. If `null`, the response will be "null".
 *   If `undefined`, there will be no response body.
 */
JsonRoutes.sendResult = function (res, options) {
  options = options || {};

  // We've already set global headers on response, but if they
  // pass in more here, we set those.
  if (options.headers) setHeaders(res, options.headers);

  // Set status code on response
  res.statusCode = options.code || 200;

  // Set response body
  writeJsonToBody(res, options.data);

  // Send the response
  res.end();
};

function setHeaders(res, headers) {
  _.each(headers, function (value, key) {
    res.setHeader(key, value);
  });
}

function writeJsonToBody(res, json) {
  if (json !== undefined) {
    var shouldPrettyPrint = (process.env.NODE_ENV === 'development');
    var spacer = shouldPrettyPrint ? 2 : null;
    res.setHeader('Content-type', 'application/json');
    res.write(JSON.stringify(json, null, spacer));
  }
}
