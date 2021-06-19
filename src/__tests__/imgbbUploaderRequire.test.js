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

test("passing a 'name' that imgBB API can't exactly return should throw by default", async () => {
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  const funkyName = `${valarDohaeris} 🀄 ;,/?:@&=+$# -_.!~*'() ABC abc 123`;
  await imgbbUploader({
    imagePath: path.join(imagePath, `${filename}.png`),
    apiKey: process.env.API_KEY,
    name: `i Completely synergize resource taxing relationships via premier niche markets.  Professionally cultivat
      `, //funkyName,
  })
    .then((res) => {
      console.log("clg just before fail; res.image.name ? ", res.image.name);
      fail();
    })
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("passing a 'name' that imgBB API can't exactly return shouldn't throw if options['w/eName'] is set to true ", async () => {
  const base64waifu = await fakeWaifu("base64string");
  const valarDohaeris = tfaker.firstName();
  expect(
    await imgbbUploader({
      base64string: base64waifu,
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
      "w/eName": true,
    }).then((res) => Boolean(res.image.name)),
  ).toBe(true);
});

test("passing two strings as params", async () => {
  const filename = await fakeWaifu();
  expect(
    await imgbbUploader(
      process.env.API_KEY,
      path.join(imagePath, `${filename}.png`),
    ).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});

test("passing two strings as params: invalid file path should throw", async () => {
  const filename = await fakeWaifu();
  return await imgbbUploader(
    process.env.API_KEY,
    path.join("definitely-not-a-file-path", `${filename}.png`),
  )
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("passing an option object with expiration as 3rd param", async () => {
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

test("passing an option object with name as 3rd param", async () => {
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

test("passing an option object with name & expiration params", async () => {
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

test("no 'imagePath' in default object should throw if no 'base64string' key", async () => {
  const valarDohaeris = tfaker.firstName();
  const randomFilename = valarDohaeris + Date.now();
  return await imgbbUploader({
    explosionPath: path.join(imagePath, `${randomFilename}.png`),
    apiKey: process.env.API_KEY,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("no 'apiKey' param in default object should throw", async () => {
  const filename = await fakeWaifu();
  return await imgbbUploader({
    path: path.join(imagePath, `${filename}.png`),
    naniKey: process.env.API_KEY,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("passing a 'valid enough' option object", async () => {
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

test("passing a base64string, expiration & name", async () => {
  const base64waifu = await fakeWaifu("base64string");
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      base64string: base64waifu,
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

test("passing a base64string & name", async () => {
  const base64waifu = await fakeWaifu("base64string");
  const valarDohaeris = tfaker.firstName();
  expect(
    await imgbbUploader({
      base64string: base64waifu,
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
    }).then((res) => res.image.name),
  ).toStrictEqual(valarDohaeris);
});

test("passing invalid base64 string should throw", async () => {
  const base64waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    base64string: `uwu!${base64waifu}owo!`,
    apiKey: process.env.API_KEY,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("no file in given imagePath should throw", async () => {
  return await imgbbUploader({
    imagePath: "definitely-not-the-path.png",
    apiKey: process.env.API_KEY,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("non-object single argument should throw", async () => {
  return await imgbbUploader(() => null)
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
