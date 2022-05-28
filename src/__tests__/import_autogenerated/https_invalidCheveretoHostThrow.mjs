import "dotenv/config";
import { imgbbUploader } from "../../../lib/esm";
import { fakeWaifu } from "../utils";

test("ESM: HTTPS: invalid cheveretoHost should throw properly", async () => {
  const waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
    cheveretoHost: `${process.env.CHEVERETO_HTTP_HOST.split("http://")[1]}`,
    base64string: waifu,
  })
    .then((res) => fail(res))
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
