import "dotenv/config";
import path from "path";
import imagePath from "../images/imagePath";
import { fakeWaifu } from "../utils";
import imgbbUploader from "../../../lib/cjs";

test("ESM: passing two strings as params", async () => {
  const filename = await fakeWaifu();
  expect(
    await imgbbUploader(process.env.API_KEY, path.join(imagePath, `${filename}.png`)).then((res) =>
      Boolean(res.image.url),
    ),
  ).toBe(true);
});
