const imgbbUploader = require("../../../lib/cjs");

test("non-object single argument should throw", async () => {
  return await imgbbUploader(() => null)
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
