var fs = require('fs');
var request = require('request');

var imgbbUploader = async function(apiKey, pathToFile){
  var formData = {
    image : fs.createReadStream(pathToFile)
  }
  return new Promise((resolve, reject) => {
  request.post({
    url: `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData: formData
  },
    function cb(err, httpResponse, body) {
      if (err) {
        console.error('Upload failed:', err)  
        reject(err);
      }
      resolve(body)
    })
  })
}

async function uploadToImgbb(apiKey, pathToFile){
	const result = await imgbbUploader(apiKey, pathToFile);
  return JSON.parse(result).data;
}

module.exports = uploadToImgbb;
