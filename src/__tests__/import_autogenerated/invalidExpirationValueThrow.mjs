import "dotenv/config";
import path from "path";
import imagePath from "../images/imagePath";
import { imgbbUploader } from "../../../lib/esm";
import { fakeWaifu } from "../utils";

test("ESM: passing an option object with NaN expiration value should throw", async () => {
  const filename = await fakeWaifu();
  const randomExpirationValue = "Not a Number";
  return await imgbbUploader({
    imagePath: path.join(imagePath, `${filename}.png`),
    apiKey: process.env.API_KEY,
    expiration: randomExpirationValue,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});

test("ESM: passing an option object with out-of-range expiration value should throw", async () => {
  const filename = await fakeWaifu();
  return await imgbbUploader({
    imagePath: path.join(imagePath, `${filename}.png`),
    apiKey: process.env.API_KEY,
    expiration: 30,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
