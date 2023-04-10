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
          const filename = `${randomFilename}-thiqq`;
          return generateWaifu({
            path: "./src/__tests__/images",
            filename,
            macrophilia: {
              height: 5742,
              thiqq: true,
            },
          }).then(() => resolve(filename));
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

const randomImageUrl = () =>
  new Promise((resolve, reject) => {
    return https
      .get("https://random.imagecdn.app/v1/image?width=300&height=300", (res) => {
        res.setEncoding("utf8");
        let response = "";
        res.on("data", (d) => (response += d));
        res.on("end", () => resolve(response));
      })
      .on("error", (e) => reject(e));
  });

module.exports = {
  fakeWaifu,
  randomImageUrl,
};
