require("dotenv").config();

const path = require("path");
const imagePath = require("./images/imagePath");
const imgbbUploader = require("../../lib/cjs");
const generateWaifu = require("waifu-generator");
const tfaker = require("tfaker");

const fakeWaifu = (mode) =>
  new Promise((resolve, reject) => {
    const randomFilename = tfaker.firstName() + Date.now();
    switch (mode) {
      case "base64string":
        try {
          return generateWaifu({
            skipFs: true,
          }).then((res) => resolve(res));
        } catch (e) {
          reject(e);
        }

      default:
        try {
          return generateWaifu({
            path: "./src/__tests__/images",
            filename: randomFilename,
          }).then(() => resolve(randomFilename));
        } catch (e) {
          reject(e);
        }
    }
  });

test("imgbbUploader w/ require: passing NO option object", async () => {
  const filename = await fakeWaifu();
  expect(
    await imgbbUploader(
      process.env.API_KEY,
      path.join(imagePath, `${filename}.png`),
    ).then((res) => {
      return Boolean(res.image.url);
    }),
  ).toBe(true);
});

test("imgbbUploader w/ require: passing an option object with expiration as 3rd param", async () => {
  const filename = await fakeWaifu();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  const options = {
    imagePath: path.join(imagePath, `${filename}.png`),
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
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  const options = {
    imagePath: path.join(imagePath, `${filename}.png`),
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
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  const options = {
    imagePath: path.join(imagePath, `${filename}.png`),
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
    explosionPath: path.join(imagePath, `${randomFilename}.png`),
    apiKey: process.env.API_KEY,
  };
  return await imgbbUploader(options)
    .then((res) => res)
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("imgbbUploader w/ require: passing an invalid option object should throw when 'apiKey' param is faulty", async () => {
  const filename = await fakeWaifu();
  const options = {
    path: path.join(imagePath, `${filename}.png`),
    naniKey: process.env.API_KEY,
  };
  return await imgbbUploader(options)
    .then((res) => res)
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("imgbbUploader w/ require: passing a 'valid enough' option object should not throw", async () => {
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  const options = {
    imagePath: path.join(imagePath, `${filename}.png`),
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

test("imgbbUploader w/ require: passing a base64string, expiration & name", async () => {
  this.base64waifu = "";
  await fakeWaifu("base64string").then((res) => (this.base64waifu = res));
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;

  // remove base64 marker to please imgBB API
  const pureBase64Data = this.base64waifu.split("data:image/png;base64,")[1];

  const options = {
    base64string: pureBase64Data,
    apiKey: process.env.API_KEY,
    name: valarDohaeris,
    expiration: randomExpirationValue,
  };
  expect(
    await imgbbUploader(options).then((res) => {
      return Boolean(res.image.url);
    }),
  ).toBe(true);
});
