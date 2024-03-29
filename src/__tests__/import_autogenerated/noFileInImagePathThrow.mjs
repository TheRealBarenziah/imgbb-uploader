import "dotenv/config";
import { imgbbUploader } from "../../../lib/esm";

test("ESM: no file in given imagePath should throw", async () => {
  return await imgbbUploader({
    imagePath: "definitely-not-the-path.png",
    apiKey: process.env.API_KEY,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
