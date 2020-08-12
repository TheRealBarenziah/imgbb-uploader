require('dotenv').config();

const imgbbUploader = require("./index.js");

imgbbUploader(process.env.API_KEY, "./megumin.jpg")
  .then(response => console.log(response))
  .catch(error => console.error(error))