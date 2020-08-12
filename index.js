require('dotenv').config();

const fs = require('fs')
const https = require('https')
const querystring = require('querystring');

// Turn image file into base64 string
const base64str = (imagePath) => new Promise((resolve, reject) => {
  return fs.readFile(imagePath, "base64", (err, data) => {
    if (err) {
      console.error(err)
      reject(err)
    }
    resolve(data)
  })
})

const imgbbUploader = (apiKey, base64str) => new Promise((resolve, reject) => {

  const payload = querystring.stringify({
    image: base64str
  })

  const options = {
    hostname: "api.imgbb.com",
    method: "POST",
    timeout: 5000,
    path: `/1/upload?key=${apiKey}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': payload.length
    }
  }

  const req = https.request(options, (res) => {
    let response = ""

    data = payload

    res.on('data', (d) => {
      response += d;
    });

    res.on('end', () => {
      const output = JSON.parse(response).data
      resolve(output)
    });

  }).on("error", (err) => {
    console.error(`Error:\n${err.message}`);
    reject(err)
  });

  req.write(payload);
  req.end();
});

const uploadToImgbb = async (apiKey, pathToFile) => {
  const base64string = await base64str(pathToFile)
  return imgbbUploader(apiKey, base64string)
}

module.exports = uploadToImgbb
