import * as fs from 'fs';
import * as request from 'request';

const imgbbUploader = async (apiKey, pathToFile) => {
  const formData = {
    image: fs.createReadStream(pathToFile)
  }
  return new Promise((resolve, reject) => {
    request.post({
      url: `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData: formData
    },
    (err, httpResponse, body) => {
      if (err) {
        console.error('Upload failed:\n', err)
        reject(err)
      }
      resolve(body)
    })
  })
}

export const uploadToImgbb = async (apiKey, pathToFile) => {
  const result = await imgbbUploader(apiKey, pathToFile)
  return JSON.parse(result).data