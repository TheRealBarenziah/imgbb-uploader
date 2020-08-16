import * as path from "path";
import imgbbUploader from "../../lib/esm/index";

test("imgbbUploader using Import", async () => {
  expect(
    await imgbbUploader(
      `${process.env.API_KEY}`,
      path.join(__dirname, "megumin.jpg"),
    ).then((res) => res.size),
  ).toBe(51895);
});
