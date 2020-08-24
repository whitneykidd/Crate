## Walk through observations
1. When I visit /crates
- route: `code/web/src/setup/routes`
- route redirects to page: `code/web/src/modules/crate/List.js`
- `List.js` returns a list of crates from api via `/web/src/modules/crate/api/actions.js` using `getList` function
  => `getList` items from above are turned into `CrateItem` and are displayed with `+ subscribe` link from `/web/src/modules/crate/Item.js`

2. the first time I click on + subscribe I am taken to a style preferences page /style-preference
- clicking `+ subscribe` routes user to `/web/src/modules/user/Subscriptions.js`
- route hit: `/web/src/setup/routes/user.js` (/user/subscription route)
  => line 45 of `/web/src/modules/crate/Item.js` triggers the route

## Files annotated:
- code/web/src/modules/pages/home.js

- code/api/src/modules/crate/model.js
- code/api/src/modules/crate/mutations.js
- code/api/src/modules/crate/query.js
- code/api/src/modules/crate/resolvers.js
- code/api/src/modules/crate/types.js
- code/api/src/index.js

- code/api/src/modules/user/model.js
- code/api/src/modules/user/mutations.js
- code/api/src/modules/user/query.js
- code/api/src/modules/user/resolvers.js
- code/api/src/modules/user/types.js
- code/api/src/modules/subscription/types.js

/* code-annotations-wk
*/