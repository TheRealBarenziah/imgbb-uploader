import "dotenv/config";
import { imgbbUploader } from "../../../lib/esm";
import { fakeWaifu } from "../utils";

test("ESM: HTTP: providing 'cheveretoPort' parameter while server is listening on that port", async () => {
  const waifu = await fakeWaifu("base64string");
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTP_API_KEY,
      cheveretoHost: `${process.env.CHEVERETO_HTTP_HOST}:80`,
      base64string: waifu,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
