# tl;dr

- Clone project
- `npm i`
- `npm run dev`

# the long read

`npm run dev` is a shortcut for `npm run build && npm run lint && npm run test && npm run remap` :

- `npm run build` will remove existing `coverage` and `lib` folder, then compile the code in `src` into `lib` folder
- `npm run lint` will run tslint on source files
- `npm run test` will run the tests defined in `src/__tests__`
- `npm run remap` will leverage `remap-istanbul` module to generate HTML Code Coverage report for your TypeScript.
- This report can be found here: `./coverage/ts-report`). Transpiled code report just in case: (`./coverage/lcov-report`).

See more scripts in `package.json`.

If you don't know the purpose of some config files, [this excellent resource](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c) should guide you through.

`'Issue' || 'PR'` are both appreciated :)
