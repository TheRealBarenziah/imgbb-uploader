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
          }).then((res) => resolve(res.split("data:image/png;base64,")[1]));
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
    ).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});

test("imgbbUploader w/ require: passing an option object with expiration as 3rd param", async () => {
  const filename = await fakeWaifu();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      imagePath: path.join(imagePath, `${filename}.png`),
      apiKey: process.env.API_KEY,
      expiration: randomExpirationValue,
    }).then((res) => Number(res.expiration)),
  ).toBe(randomExpirationValue);
});

test("imgbbUploader w/ require: passing an option object with name as 3rd param", async () => {
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  expect(
    await imgbbUploader({
      imagePath: path.join(imagePath, `${filename}.png`),
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
    }).then((res) => res.image.name),
  ).toBe(valarDohaeris);
});

test("imgbbUploader w/ require: passing an option object with name & expiration params", async () => {
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      imagePath: path.join(imagePath, `${filename}.png`),
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
      expiration: randomExpirationValue,
    }).then((res) =>
      Object({
        name: res.image.name,
        expiration: Number(res.expiration),
      }),
    ),
  ).toStrictEqual({
    name: valarDohaeris,
    expiration: randomExpirationValue,
  });
});

test("imgbbUploader w/ require: passing an invalid option object should throw when 'imagePath' param is faulty", async () => {
  const valarDohaeris = tfaker.firstName();
  const randomFilename = valarDohaeris + Date.now();
  return await imgbbUploader({
    explosionPath: path.join(imagePath, `${randomFilename}.png`),
    apiKey: process.env.API_KEY,
  })
    .then(() => fail()) // Test should fail if ever entering this block
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("imgbbUploader w/ require: passing an invalid option object should throw when 'apiKey' param is faulty", async () => {
  const filename = await fakeWaifu();
  return await imgbbUploader({
    path: path.join(imagePath, `${filename}.png`),
    naniKey: process.env.API_KEY,
  })
    .then(() => fail()) // Test should fail if ever entering this block
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("imgbbUploader w/ require: passing a 'valid enough' option object should not throw", async () => {
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      imagePath: path.join(imagePath, `${filename}.png`),
      apiKey: process.env.API_KEY,
      naem: valarDohaeris,
      expuration: randomExpirationValue,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});

test("imgbbUploader w/ require: passing a base64string, expiration & name", async () => {
  this.base64waifu = "";
  await fakeWaifu("base64string").then((res) => (this.base64waifu = res));
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      base64string: this.base64waifu,
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
      expiration: randomExpirationValue,
    }).then((res) =>
      Object({ name: res.image.name, expiration: Number(res.expiration) }),
    ),
  ).toStrictEqual({
    name: valarDohaeris,
    expiration: randomExpirationValue,
  });
});

test("imgbbUploader w/ require: passing a base64string & name", async () => {
  this.base64waifu = "";
  await fakeWaifu("base64string").then((res) => (this.base64waifu = res));
  const valarDohaeris = tfaker.firstName();
  expect(
    await imgbbUploader({
      base64string: this.base64waifu,
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
    }).then((res) => res.image.name),
  ).toStrictEqual(valarDohaeris);
});

test("imgbbUploader w/ require: passing a base64string without apiKey should throw", async () => {
  this.base64waifu = "";
  await fakeWaifu("base64string").then((res) => (this.base64waifu = res));
  return await imgbbUploader({
    base64string: this.base64waifu,
    apiKey: "definitely-not-an-api-key",
  })
    .then(() => fail()) // Test should fail if ever entering this block
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
