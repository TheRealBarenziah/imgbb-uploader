const exportHelper = require("export-helper"); // what a marvelous module !!

const updateExport = () => {
  if (process.argv.slice(2)[0] === "es5") {
    exportHelper({
      mode: "es5",
      path: "src/index.ts",
      silent: true,
    }).then((res) => res);
  } else if (process.argv.slice(2)[0] === "es6") {
    exportHelper({
      mode: "es6",
      path: "src/index.ts",
      silent: true,
    }).then((res) => res);
  } else throw "Oopsie, it seems you forgot to pass either 'es5' or 'es6' as argument !";
};

updateExport();
