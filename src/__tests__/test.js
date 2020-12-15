const http = require("http");
const axios = require("axios");
const fs = require("fs").promises;
const util = require("util");
const stream = require("stream");
const pipeline = util.promisify(stream.pipeline);

const generateRandomImage = async () =>
  new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 100000);
    return axios
      .get(
        `https://www.thiswaifudoesnotexist.net/example-${randomNumber}.jpg`,
        { Accept: "image/jpeg" },
      )
      .then(async (res) => {
        console.log(res);
        await fs.writeFile("test.jpg", res.data, { encoding: null }, (e) =>
          console.log(e),
        );
        resolve(res.data);
      })
      .catch((e) => console.log(e));
  });

generateRandomImage();
