import "dotenv/config";
import imgbbUploader from "../../../lib/cjs";
import { fakeWaifu } from "../utils";
import tfaker from "tfaker";

test("ESM: passing a base64string & name", async () => {
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
