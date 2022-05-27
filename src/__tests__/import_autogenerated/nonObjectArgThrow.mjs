import imgbbUploader from "../../../lib/esm";

test("ESM: non-object single argument should throw", async () => {
  return await imgbbUploader(() => null)
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
