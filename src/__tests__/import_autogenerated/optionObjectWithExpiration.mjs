import "dotenv/config";
import path from "path";
import imagePath from "../images/imagePath";
import { fakeWaifu } from "../utils";
import { imgbbUploader } from "../../../lib/esm";

test("ESM: passing an option object with expiration as 3rd param", async () => {
  const filename = await fakeWaifu();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      imagePath: path.join(imagePath, `${filename}.png`),
      apiKey: process.env.API_KEY,
      expiration: randomExpirationValue,
    }).then((res) => Number(res.expiration)),
  ).toBe(randomExpirationValue);
});
