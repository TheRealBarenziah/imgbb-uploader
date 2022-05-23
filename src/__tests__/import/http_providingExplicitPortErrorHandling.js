import "dotenv/config";
import imgbbUploader from "../../../lib/esm";
import { fakeWaifu } from "../utils";

test("ESM: HTTP: providing 'cheveretoPort' parameter while server isn't listening on that port should throw gracefully", async () => {
  const waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    apiKey: process.env.CHEVERETO_HTTP_API_KEY,
    cheveretoHost: `${process.env.CHEVERETO_HTTP_HOST}:8080`,
    base64string: waifu,
  })
    .then((res) => fail(res))
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
