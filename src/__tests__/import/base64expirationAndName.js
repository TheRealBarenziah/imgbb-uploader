import imgbbUploader from "../../../lib/esm";
import { fakeWaifu } from "../utils";
import tfaker from "tfaker";

test("ESM: passing a base64string, expiration & name", async () => {
  const base64waifu = await fakeWaifu("base64string");
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      base64string: base64waifu,
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
      expiration: randomExpirationValue,
    }).then((res) => Object({ name: res.image.name, expiration: Number(res.expiration) })),
  ).toStrictEqual({
    name: valarDohaeris,
    expiration: randomExpirationValue,
  });
});
