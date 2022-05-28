import "dotenv/config";
import path from "path";
import imagePath from "../images/imagePath";
import { imgbbUploader } from "../../../lib/esm";
import { fakeWaifu } from "../utils";

test("ESM: passing multiple valid input sources (imagePath + imageUrl) should throw", async () => {
  const filename = await fakeWaifu();
  const imageUrl = "https://picsum.photos/400";
  expect(
    await imgbbUploader({
      apiKey: process.env.API_KEY,
      imagePath: path.join(imagePath, `${filename}.png`),
      imageUrl,
    })
      .then(() => fail())
      .catch((e) => expect(e).toBeInstanceOf(Error)),
  );
});

test("ESM: passing multiple valid input sources (base64string + imagePath) should throw", async () => {
  const base64waifu = await fakeWaifu("base64string");
  const filename = await fakeWaifu();
  expect(
    await imgbbUploader({
      apiKey: process.env.API_KEY,
      imagePath: path.join(imagePath, `${filename}.png`),
      base64string: base64waifu,
    })
      .then(() => fail())
      .catch((e) => expect(e).toBeInstanceOf(Error)),
  );
});

test("ESM: passing multiple valid input sources (base64string + imageUrl) should throw", async () => {
  const base64waifu = await fakeWaifu("base64string");
  const imageUrl = "https://picsum.photos/400";
  expect(
    await imgbbUploader({
      apiKey: process.env.API_KEY,
      base64string: base64waifu,
      imageUrl,
    })
      .then(() => fail())
      .catch((e) => expect(e).toBeInstanceOf(Error)),
  );
});
