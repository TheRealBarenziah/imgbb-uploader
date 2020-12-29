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

test("imgbbUploader w/ require: passing an option object with expiration as 3rd param", async () => {
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

test("imgbbUploader w/ require: passing an option object with name as 3rd param", async () => {
  const valarDohaeris = tfaker.firstName();
  const randomFilename = valarDohaeris + Date.now();
  await generateWaifu({
    path: "./src/__tests__/images",
    filename: randomFilename,
  });
  const options = {
    imagePath: path.join(imagePath, `${randomFilename}.jpg`),
    apiKey: process.env.API_KEY,
    name: valarDohaeris,
  };
  expect(
    await imgbbUploader(options).then((res) => {
      return res.image.name;
    }),
  ).toBe(valarDohaeris);
});

test("imgbbUploader w/ require: passing an option object with name & expiration params", async () => {
  const valarDohaeris = tfaker.firstName();
  const randomFilename = valarDohaeris + Date.now();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 60;
  await generateWaifu({
    path: "./src/__tests__/images",
    filename: randomFilename,
  });
  const options = {
    imagePath: path.join(imagePath, `${randomFilename}.jpg`),
    apiKey: process.env.API_KEY,
    name: valarDohaeris,
    expiration: randomExpirationValue,
  };
  expect(
    await imgbbUploader(options).then((res) => {
      return {
        name: res.image.name,
        expiration: Number(res.expiration),
      };
    }),
  ).toStrictEqual({
    name: valarDohaeris,
    expiration: randomExpirationValue,
  });
});

test("imgbbUploader w/ require: passing an invalid option object should throw when 'imagePath' param is faulty", async () => {
  const valarDohaeris = tfaker.firstName();
  const randomFilename = valarDohaeris + Date.now();
  const options = {
    archmagePath: path.join(imagePath, `${randomFilename}.jpg`),
    apiKey: process.env.API_KEY,
  };
  expect(await imgbbUploader(options).catch((e) => e)).toThrow();
});

test("imgbbUploader w/ require: passing an invalid option object should throw when 'apiKey' param is faulty", async () => {
  const valarDohaeris = tfaker.firstName();
  const randomFilename = valarDohaeris + Date.now();
  const options = {
    path: path.join(imagePath, `${randomFilename}.jpg`),
    naniKey: process.env.API_KEY,
  };
  expect(
    await imgbbUploader(options).then((res) => {
      return {
        name: res.image.name,
        expiration: res.expiration,
      };
    }),
  ).toThrow();
});

test("imgbbUploader w/ require: passing a 'good enough' option object should warn without throwing", async () => {
  const valarDohaeris = tfaker.firstName();
  const randomFilename = valarDohaeris + Date.now();
  const options = {
    imagePath: path.join(imagePath, `${randomFilename}.jpg`),
    apiKey: process.env.API_KEY,
    naem: valarDohaeris,
    expuration: randomExpirationValue,
  };
  expect(
    await imgbbUploader(options).then((res) => {
      return Boolean(res.image.url);
    }),
  ).toBe(true);
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

/*
{
        id: 'f2JV3RN',
        title: 'ea5c61836e7a',
        url_viewer: 'https://ibb.co/f2JV3RN',
        url: 'https://i.ibb.co/rm9KBPp/ea5c61836e7a.jpg',
        display_url: 'https://i.ibb.co/XbHfnB5/ea5c61836e7a.jpg',
        size: 261642,
        time: '1609157359',
        expiration: '0',
        image: {
          filename: 'ea5c61836e7a.jpg',
          name: 'ea5c61836e7a',
          mime: 'image/jpeg',
          extension: 'jpg',
          url: 'https://i.ibb.co/rm9KBPp/ea5c61836e7a.jpg'
        },
        thumb: {
          filename: 'ea5c61836e7a.jpg',
          name: 'ea5c61836e7a',
          mime: 'image/jpeg',
          extension: 'jpg',
          url: 'https://i.ibb.co/f2JV3RN/ea5c61836e7a.jpg'
        },
        medium: {
          filename: 'ea5c61836e7a.jpg',
          name: 'ea5c61836e7a',
          mime: 'image/jpeg',
          extension: 'jpg',
          url: 'https://i.ibb.co/XbHfnB5/ea5c61836e7a.jpg'
        },
        delete_url: 'https://ibb.co/f2JV3RN/318b8e284dc9535ad91de38ef34ad19b'
      }
*/
