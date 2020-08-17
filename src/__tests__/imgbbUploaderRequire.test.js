var path = require("path");
var imgbbUploader = require("../../lib/cjs");

test("imgbbUploader using require", async () => {
  expect(
    await imgbbUploader(
      process.env.API_KEY,
      path.join(__dirname, "megumin.jpg"),
    ).then((res) => res.size),
  ).toBe(51895);
});
