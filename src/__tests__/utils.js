const generateWaifu = require("waifu-generator");
const tfaker = require("tfaker");
const https = require("https");

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
            macrophilia: {
              height: 8000,
              thiqq: true,
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

const randomImageUrl = async () =>
  new Promise((resolve, reject) => {
    return https
      .get("https://picsum.photos/400", (res) => {
        resolve(res.headers.location);
        res.on("data", (d) => {
          process.stdout.write(d);
        });
      })
      .on("error", (e) => {
        reject(e);
      });
  });

module.exports = {
  fakeWaifu,
  randomImageUrl,
};
