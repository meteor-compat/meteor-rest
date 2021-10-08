# Compatibility

**Compatible with Meteor 2.4**

This repository provides versions for the package [simple:rest-method-mixin](https://github.com/meteor-compat/meteor-rest/tree/devel/packages/rest-method-mixin) that are compatible with latest Meteor. This is necessary because the author is not maintaining package anymore.

## Changes
- v1.1.0
    - `api.versionsFrom` on `Package.onUse` was changed from `1.2.1` to `2.4`.

# simple:rest-method-mixin

A mixin for [`mdg:validated-method`](https://atmospherejs.com/mdg/validated-method) to configure the HTTP endpoint for that Method when using [`simple:rest`](https://github.com/stubailo/meteor-rest/blob/master/packages/rest/README.md).

Use it like this:

```js
const method = new ValidatedMethod({
  name: 'method',
  mixins: [RestMethodMixin],
  validate: ...,
  restOptions: {
    url: '/my-custom-url',
    // any other options
  },
  run() {
    return 5;
  }
});
```

This mixin just calls `SimpleRest.setMethodOptions` with the `restOptions` passed in.
