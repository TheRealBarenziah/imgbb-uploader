require("dotenv").config();
const path = require("path");
const imgbbUploader = require("../../lib/cjs");
const imagePath = require("./images/imagePath");
const { fakeWaifu } = require("./utils");

test("upload file to chevereto-free", async () => {
  const filename = await fakeWaifu();
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTP_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTP_HOST,
      cheveretoPort: Number(process.env.CHEVEROTO_HTTP_PORT) || undefined,
      cheveretoHttps: process.env.CHEVERETO_HTTPS ? true : false,
      imagePath: path.join(imagePath, `${filename}.png`),
    }).then((res) => Boolean(res.image.display_url)),
  ).toBe(true);
});

test("upload base64 string to chevereto-free", async () => {
  const waifu = await fakeWaifu("base64string");
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTP_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HOST,
      cheveretoPort: Number(process.env.CHEVEROTO_HTTP_PORT) || undefined,
      cheveretoHttps: process.env.CHEVERETO_HTTPS ? true : false,
      base64string: waifu,
    }).then((res) => Boolean(res.image.display_url)),
  ).toBe(true);
});

test("upload uri to chevereto-free", async () => {
  const imageUrl = "https://picsum.photos/400";
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTP_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HOST,
      cheveretoPort: Number(process.env.CHEVEROTO_HTTP_PORT) || undefined,
      cheveretoHttps: process.env.CHEVERETO_HTTPS ? true : false,
      imageUrl,
    }).then((res) => Boolean(res.image.display_url)),
  ).toBe(true);
});
