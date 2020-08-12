const fs = require('fs')
const https = require('https')
const querystring = require('querystring');

// Promess to turn your image file into base64 string
const base64str = (imagePath) => new Promise((resolve, reject) => {
  return fs.readFile(imagePath, "base64", (err, data) => {
    if (err) {
      console.error(err)
      reject(err)
    }
    resolve(data)
  })
})

/* 
Reinventing the wheel to get rid of the deprecated dependency ("request").
Basically, it's the standard `https.request()` method, wrapped into a promise so the change should be non-breaking.
For more informations on this method, see https://nodejs.org/api/https.html#https_https_request_options_callback
*/
const imgbbUploader = (apiKey, base64str) => new Promise((resolve, reject) => {

  const payload = querystring.stringify({
    image: base64str
  })
// This is a standard method: https://nodejs.org/api/querystring.html#querystring_querystring_stringify_obj_sep_eq_options

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

/**
 * @typedef {Object} image
 * @property {string} filename Full filename with extension.
 * @property {string} name Filename without extension.
 * @property {string} mime File MIME ('image/$extension').
 * @property {string} extension File extension (e.g: 'jpg').
 * @property {string} url Url for standard image view.
 * @property {number} size File size in bytes.
 */

/**
 * @typedef {Object} thumb
 * @property {string} filename Thumbnail filename with extension.
 * @property {string} name Thumbnail filename without extension.
 * @property {string} mime Thumbnail MIME ('image/$extension').
 * @property {string} extension Thumbnail file extension (e.g: 'jpg').
 * @property {string} url Thumbnail standard url.
 * @property {number} size Thumbnail size in bytes.
 */

/**
 * @typedef {Object} ResponseObject
 * @property {string} id The id of the file.
 * @property {string} url_viewer Url for wrapped image view.
 * @property {string} url Url for standard image view.
 * @property {string} display_url Url for standard image view.
 * @property {string} title Image title that was provided.
 * @property {image} image Image nested object.
 * @property {thumb} thumb Thumbnail nested object.
 * @property {string} delete_url Url that allow image deletion.
 */

/**
 * Upload local pictures files to imgbb API and get display URLs in response.
 *
 * @param {string} apiKey - Your imgBB API key
 * @param {string} pathToFile - Absolute path to your file
 * @returns {Promise.<ResponseObject>}
 *    A promise. Access your data using `.then` as stated by [the documentation](www.perdu.com) :
 * @example
 *     imgbbUploader("your-api-key", "absolute/path/to/file.jpg")
 *       .then(res => console.log(res))
 *       .catch(err => console.error(err))
 */
const uploadToImgbb = async (apiKey, pathToFile) => {
  const base64string = await base64str(pathToFile)
  return imgbbUploader(apiKey, base64string)
}

module.exports = uploadToImgbb