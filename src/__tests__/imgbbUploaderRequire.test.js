require("dotenv").config();

const path = require("path");
const imagePath = require("./images/imagePath");
const imgbbUploader = require("../../lib/cjs");
const generateWaifu = require("waifu-generator");
const tfaker = require("tfaker");

test("imgbbUploader w/ require: passing NO option object", async () => {
  const randomFilename = tfaker.firstName() + Date.now();
  await generateWaifu({
    path: "./src/__tests__/images",
    filename: randomFilename,
  });
  expect(
    await imgbbUploader(
      process.env.API_KEY,
      path.join(imagePath, `${randomFilename}.jpg`),
    ).then((res) => {
      return Boolean(res.image.url);
    }),
  ).toBe(true);
});

test("imgbbUploader w/ require: passing an option object, with expiration param", async () => {
  const randomFilename = tfaker.firstName() + Date.now();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 1;
  await generateWaifu({
    path: "./src/__tests__/images",
    filename: randomFilename,
  });
  const options = {
    imagePath: path.join(imagePath, `${randomFilename}.jpg`),
    apiKey: process.env.API_KEY,
    expiration: randomExpirationValue,
  };
  expect(
    await imgbbUploader(options).then((res) => {
      return Number(res.expiration);
    }),
  ).toBe(randomExpirationValue);
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
