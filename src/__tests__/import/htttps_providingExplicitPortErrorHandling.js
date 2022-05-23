import "dotenv/config";
import imgbbUploader from "../../../lib/cjs";
import { fakeWaifu } from "../utils";

test("ESM: HTTPS: providing 'cheveretoPort' parameter while server isn't listening on that port should throw gracefully", async () => {
  const waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
    cheveretoHost: `${process.env.CHEVERETO_HTTPS_HOST}:8443`,
    base64string: waifu,
  })
    .then((res) => fail(res))
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
