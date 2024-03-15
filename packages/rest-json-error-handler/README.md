# Compatibility

**Compatible with Meteor 2.4 and Meteor 3.0**

This repository provides versions for the package [simple:rest-json-error-handler](https://github.com/meteor-compat/meteor-rest/tree/devel/packages/rest-json-error-handler) that are compatible with latest Meteor. This is necessary because the author is not maintaining package anymore.

## Changes
- v1.1.3
  - Relaxed `simple:json-routes` dependency to include `v3.0.0`.
  - `api.versionsFrom` on `Package.onUse` includes Meteor version `3.0`.
- v1.1.1
  - Update simple:json-routes to 2.3.0
- v1.1.0
    - `api.versionsFrom` on `Package.onUse` was changed from `1.0` to `2.4`.

# simple:rest-json-error-handler

SimpleRest error middleware for converting thrown Meteor.Errors to JSON and sending the response.

## Usage

Handle errors from all routes:

```js
JsonRoutes.ErrorMiddleware.use(RestMiddleware.handleErrorAsJson);
```

Handle errors from one route:

```js
JsonRoutes.ErrorMiddleware.use(
  '/handle-error',
  RestMiddleware.handleErrorAsJson
);
```

## Example

```js
JsonRoutes.ErrorMiddleware.use(
  '/handle-error',
  RestMiddleware.handleErrorAsJson
);

JsonRoutes.add('get', 'handle-error', function () {
  var error = new Meteor.Error('not-found', 'Not Found');
  error.statusCode = 404;
  throw error;
});
```
