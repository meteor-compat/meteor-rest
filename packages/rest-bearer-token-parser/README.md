# Compatibility

**Compatible with Meteor 2.4**

This repository provides versions for the package [simple:rest-json-error-handler](https://github.com/meteor-compat/meteor-rest/tree/devel/packages/rest-bearer-token-parser) that are compatible with latest Meteor. This is necessary because the author is not maintaining package anymore.

## Changes
- v1.1.0
  - `api.versionsFrom` on `Package.onUse` was changed from `1.0` to `2.4`.

# simple:rest-accounts-bearer-token

SimpleRest middleware for parsing a standard bearer token from an HTTP request

### Middleware Name

This middleware can be accessed as: 

**`JsonRoutes.Middleware.parseBearerToken`**

### Request Properties Required

- None

### Request Properties Modified

- `request.authToken`
  - _String_
  - The parsed bearer token, or `null` if none is found

## Usage

Accepts tokens passed via the standard header or URL query parameter (whichever is found first, in that order).

The header signature is: `Authorization: Bearer <token>`

The query signature is: `?access_token=<token>`
