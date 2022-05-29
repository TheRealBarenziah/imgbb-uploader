// This terrible hack is relevant as long as https://github.com/vercel/ncc/pull/914 is left unmerged
const { readFile, writeFile } = require("fs/promises");
const updateTsconfig = async () => {
  const mode = process.argv.slice(2)[0];
  if (!mode || !["esm", "cjs"].includes(mode)) {
    throw Error("updateTsConfig.js must take either 'cjs' or 'esm' as argument");
  }
  const tsconfig = await readFile("tsconfig.json", "utf-8");
  let output;
  if (mode === "cjs") {
    output = tsconfig
      .replace('"target": "ES2022"', '"target": "es5"')
      .replace('"module": "ES2022"', '"module": "CommonJS"');
  }
  if (mode === "esm") {
    output = tsconfig
      .replace('"target": "es5"', '"target": "ES2022"')
      .replace('"module": "CommonJS"', '"module": "ES2022"');
  }
  return await writeFile("tsconfig.json", output);
};

updateTsconfig();
