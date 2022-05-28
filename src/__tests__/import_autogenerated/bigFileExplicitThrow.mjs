import path from "path";
import imagePath from "../images/imagePath";
import { imgbbUploader } from "../../../lib/esm";
import { fakeWaifu } from "../utils";

jest.setTimeout(300000); // here as a bittersweet reminder of ancient times

test("ESM: passing file too big should throw explicit error", async () => {
  const filename = await fakeWaifu("bigFile");
  return await imgbbUploader({
    imagePath: path.join(imagePath, `${filename}.png`),
    apiKey: process.env.API_KEY,
  })
    .then((res) => fail(res))
    .catch((e) => expect(String(e).includes("Faulty payload")).toBe(false));
});
