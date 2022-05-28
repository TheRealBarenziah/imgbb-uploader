import "dotenv/config";
import path from "path";
import imagePath from "../images/imagePath";
import { fakeWaifu } from "../utils";
import tfaker from "tfaker";
import { imgbbUploader } from "../../../lib/esm";

test("ESM: passing an option object with name & expiration params", async () => {
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      imagePath: path.join(imagePath, `${filename}.png`),
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
      expiration: randomExpirationValue,
    }).then((res) =>
      Object({
        name: res.image.name,
        expiration: Number(res.expiration),
      }),
    ),
  ).toStrictEqual({
    name: valarDohaeris,
    expiration: randomExpirationValue,
  });
});
