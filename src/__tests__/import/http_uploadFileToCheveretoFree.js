import "dotenv/config";
import path from "path";
import imgbbUploader from "../../../lib/cjs";
import imagePath from "../images/imagePath";
import { fakeWaifu } from "../utils";

test("ESM: HTTP: upload file to chevereto-free", async () => {
  const filename = await fakeWaifu();
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTP_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTP_HOST,
      imagePath: path.join(imagePath, `${filename}.png`),
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
