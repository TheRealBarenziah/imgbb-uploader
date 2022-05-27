import "dotenv/config";
import path from "path";
import imagePath from "../images/imagePath";
import imgbbUploader from "../../../lib/esm";
import tfaker from "tfaker";

test("ESM: missing 'imagePath' in default object should throw", async () => {
  const valarDohaeris = tfaker.firstName();
  const randomFilename = valarDohaeris + Date.now();
  return await imgbbUploader({
    explosionPath: path.join(imagePath, `${randomFilename}.png`),
    apiKey: process.env.API_KEY,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
