import "dotenv/config";
import imgbbUploader from "../../../lib/esm";
import { fakeWaifu } from "../utils";

test("ESM: trying to pass 'option.customPayload.format' param should throw before even trying", async () => {
  const waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
    cheveretoHost: process.env.CHEVERETO_HTTPS_HOST,
    base64string: waifu,
    customPayload: {
      format: "redirect",
    },
  })
    .then((res) => fail(res))
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
