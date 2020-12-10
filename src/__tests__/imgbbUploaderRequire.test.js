var path = require("path");
var imgbbUploader = require("../../lib/cjs");

test("imgbbUploader using require", async () => {
  expect(
    await imgbbUploader(
      process.env.API_KEY,
      path.join(__dirname, "megumin.jpg"),
    ).then((res) => res.size),
  ).toBe(51895);
});

/*
Todo: write four tests, 
"using option object w/ 2 param", 
"using option object w/ 3 param (expiration)",
"using option object w/ 3 param (name)",
"using option object w/ 4 params"

expiration is passed into the query string
name, in the stringified payload

problem with test flow: once an image is uploaded, its 'signed' 
and subsequents uploads of the same file will return the original response,
which can lead to confusing results (aka the 'toto.jpg phenomenon')

need to imagine something to generate a new picture every time..
*/
