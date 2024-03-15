// This package is also tested in the `simple:rest` package.
if (Meteor.isServer) {
  JsonRoutes.add('GET', 'case-insensitive-method-1', function (req, res) {
    JsonRoutes.sendResult(res, {data: true});
  });

  JsonRoutes.add('Get', 'case-insensitive-method-2', function (req, res) {
    JsonRoutes.sendResult(res, {data: true});
  });

  JsonRoutes.add('get', 'case-insensitive-method-3', function (req, res) {
    JsonRoutes.sendResult(res, {data: true});
  });

  JsonRoutes.add('get', 'query-parameters-method-1', function (req, res) {
    JsonRoutes.sendResult(res, {data: req.query});
  });
} else {
  // Meteor.isClient
  Tinytest.addAsync('JSON Routes - support case-insensitive HTTP method types - Method 1', async function (test) {
    try {
      const response = await fetch('/case-insensitive-method-1');
      const data = await response.json();
      test.equal(data, true);
    } catch (err) {
      test.fail('Fetch failed: ' + err);
    }
  });

  Tinytest.addAsync('JSON Routes - support case-insensitive HTTP method types - Method 2', async function (test) {
    try {
      const response = await fetch('/case-insensitive-method-2');
      const data = await response.json();
      test.equal(data, true);
    } catch (err) {
      test.fail('Fetch failed: ' + err);
    }
  });

  Tinytest.addAsync('JSON Routes - support case-insensitive HTTP method types - Method 3', async function (test) {
    try {
      const response = await fetch('/case-insensitive-method-3');
      const data = await response.json();
      test.equal(data, true);
    } catch (err) {
      test.fail('Fetch failed: ' + err);
    }
  });

  Tinytest.addAsync('JSON Routes - test query parameters parsing - Method 1', async function (test) {
    try {
      const response = await fetch('/query-parameters-method-1?foo=bar');
      const data = await response.json();
      test.equal(data.foo, 'bar');
    } catch (err) {
      test.fail('Fetch failed: ' + err);
    }
  });
}
