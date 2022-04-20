const generateWaifu = require("waifu-generator");
const tfaker = require("tfaker");

const fakeWaifu = (mode) =>
  new Promise((resolve, reject) => {
    const randomFilename = tfaker.firstName() + Date.now();
    switch (mode) {
      case "base64string":
        try {
          return generateWaifu({
            skipFs: true,
            withoutPrefix: true,
          }).then((res) => resolve(res));
        } catch (e) {
          reject(e);
        }
        break;
      case "bigFile":
        try {
          return generateWaifu({
            skipFs: true,
            withoutPrefix: true,
            mosaic: {
              number: 30,
            },
          }).then((res) => resolve(res));
        } catch (e) {
          reject(e);
        }
        break;
      default:
        try {
          return generateWaifu({
            path: "./src/__tests__/images",
            filename: randomFilename,
          }).then(() => resolve(randomFilename));
        } catch (e) {
          reject(e);
        }
        break;
    }
  });

module.exports = {
  fakeWaifu,
};
