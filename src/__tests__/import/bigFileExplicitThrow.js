import "dotenv/config";
import imgbbUploader from "../../../lib/esm";
import { fakeWaifu } from "../utils";

test("ESM: passing file too big should throw explicit error", async () => {
  jest.setTimeout(360000);
  const base64waifu = await fakeWaifu("bigFile");
  return await imgbbUploader({
    base64string: base64waifu,
    apiKey: process.env.API_KEY,
  })
    .then((res) => fail(res))
    .catch((e) => expect(String(e).includes("Faulty payload")).toBe(false));
});
