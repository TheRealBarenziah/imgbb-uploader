import "dotenv/config";
import path from "path";
import { fakeWaifu } from "../utils";
import imgbbUploader from "../../../lib/cjs";

test("ESM: passing two strings as params: invalid file path should throw", async () => {
  const filename = await fakeWaifu();
  return await imgbbUploader(
    process.env.API_KEY,
    path.join("definitely-not-a-file-path", `${filename}.png`),
  )
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
