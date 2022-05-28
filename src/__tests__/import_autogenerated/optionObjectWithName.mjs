import "dotenv/config";
import path from "path";
import imagePath from "../images/imagePath";
import { fakeWaifu } from "../utils";
import tfaker from "tfaker";
import { imgbbUploader } from "../../../lib/esm";

test("ESM: passing an option object with name as 3rd param", async () => {
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
