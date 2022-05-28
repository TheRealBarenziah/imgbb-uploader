import "dotenv/config";
import { imgbbUploader } from "../../../lib/esm";
import { fakeWaifu } from "../utils";

test("ESM: providing additional custom keys shouldn't throw", async () => {
  const waifu = await fakeWaifu("base64string");
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTPS_HOST,
      base64string: waifu,
      customPayload: {
        nsfw: 1,
        undocumentedFeature: "ERROR_SUCCESS",
      },
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
