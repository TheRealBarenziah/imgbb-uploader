import "dotenv/config";
import path from "path";
import { imgbbUploader } from "../../../lib/esm";
import imagePath from "../images/imagePath.mjs";
import { fakeWaifu } from "../utils";

test("ESM: HTTPS: upload file to chevereto-free", async () => {
  const filename = await fakeWaifu();
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTPS_HOST,
      imagePath: path.join(imagePath, `${filename}.png`),
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
