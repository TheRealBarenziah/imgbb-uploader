import "dotenv/config";
import path from "path";
import imagePath from "../images/imagePath";
import { imgbbUploader } from "../../../lib/esm";
import { fakeWaifu } from "../utils";
import tfaker from "tfaker";

test("ESM: passing a 'valid enough' option object", async () => {
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
