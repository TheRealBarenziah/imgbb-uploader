# imgbb-uploader

Lightweight Nodejs module to upload local pictures files to imgbb API and get display URLs in response.  
Primary use is letting imgBB handle the hosting & serving of images.

[![https://nodei.co/npm/imgbb-uploader.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/imgbb-uploader.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/imgbb-uploader)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Known Vulnerabilities](https://snyk.io/test/github/TheRealBarenziah/imgbb-uploader/badge.svg?targetFile=package.json)](https://snyk.io/test/github/TheRealBarenziah/imgbb-uploader?targetFile=package.json)
[![Build Status](https://travis-ci.org/TheRealBarenziah/imgbb-uploader.svg?branch=master)](https://travis-ci.org/TheRealBarenziah/imgbb-uploader)

## Compatibility:

**Node >= 8** ( [this module uses async/await](https://node.green/) )  
_Care: this module uses `fs` under the hood. It means **it WON'T work outside the node environment !**_  
_To upload pictures from your frontend please check the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File) instead_

## Install

`npm install imgbb-uploader`

## Use with two string params (legacy, LTS)

- I) [Get a free API key from imgbb](https://api.imgbb.com/) ( estimated time ~1 minute )
- II) (facultative) [Put that in an environment variable](https://www.npmjs.com/package/dotenv)
- III) **imgbbUploader takes _exactly two_ String arguments** : your API key, and the absolute path of your image :

```javascript
const imgbbUploader = require("imgbb-uploader");

imgbbUploader(
  "your-imgbb-api-key-string",
  "absolute/path/to/your/image/image.png",
)
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

### `.then((response) => console.log(response))` output example :

```javascript
{
  id: '26Sy9tM',
  title: '5e7599f65f27',
  url_viewer: 'https://ibb.co/26Sy9tM',
  url: 'https://i.ibb.co/z5FrMR2/5e7599f65f27.png',
  display_url: 'https://i.ibb.co/z5FrMR2/5e7599f65f27.png',
  size: 260258,
  time: '1609336605',
  expiration: '0',
  image: {
    filename: '5e7599f65f27.png',
    name: '5e7599f65f27',
    mime: 'image/png',
    extension: 'png',
    url: 'https://i.ibb.co/z5FrMR2/5e7599f65f27.png'
  },
  thumb: {
    filename: '5e7599f65f27.png',
    name: '5e7599f65f27',
    mime: 'image/png',
    extension: 'png',
    url: 'https://i.ibb.co/26Sy9tM/5e7599f65f27.png'
  },
  delete_url: 'https://ibb.co/26Sy9tM/087a7edaaac26e1c940283df07d0b1d7'
}
```

This async function returns a promise, so this is normal :  
`console.log(imgbbUploader(myKey, myPath)) // output : Promise { <pending> }`  
Your data is available in `.then((response) => response)` as shown above.

## Use with options object (more features, yay! )

From version 1.2.0 onward, you can also pass an options object as param.  
Use it to customize filename and/or a set duration after which the image will be deleted, [cf their docs](https://api.imgbb.com/).

- I) [Get a free API key from imgbb](https://api.imgbb.com/) ( estimated time ~1 minute )
- II) [Put that in an environment variable](https://www.npmjs.com/package/dotenv)
- III) pass an option object as argument :

```javascript
const imgbbUploader = require("imgbb-uploader");

const options = {
  apiKey: process.env.IMGBB_API_KEY, // MANDATORY
  imagePath: "yourImagePath", // MANDATORY
  name: "yourCustomFilename", // OPTIONAL: pass a custom filename to imgBB API
  expiration: 3600 /* OPTIONAL: pass a numeric value in seconds.

  It must be in the 60-15552000 range (feature based on POSIX time).
  Enable this to force your image to be deleted after that time. */,
};

imgbbUploader(options)
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* 
  Same data structure as above; if you provided name and/or expiration value, 
  response.expiration and/or response.image.name will change accordingly.
*/
```

**This module is tiny & totally unlicensed: to better fit your need, please fork away !**  
[Basic instructions for tweaking](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/CONTRIBUTING.md)

## Learn more

This module doesn't support array uploads. For heavy duty, you'll probably have to work with [fs.readdir](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback) and [async forEach](https://www.npmjs.com/package/async-foreach) (you may also be interested in [path](https://nodejs.org/api/path.html#path_path) ).

For example, you can create a `baseDir.js` file wherever it suits you:

```
// baseDir.js
const path = require('path');
const dirPath = path.join(__dirname);
module.exports = dirPath;
```

Then you can require this file elsewhere and use something like `path.join(myDirpath, "subfolder")` to dig into directories programmatically. Once there, you can f.e. `fs.readdir` and iterate `forEach` file of that directory.  
See `fs` documentation and Stack Overflow for more inspiration on the matter.

[CHANGELOG](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/CHANGELOG.md)
