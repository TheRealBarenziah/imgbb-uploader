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

## Use

- I) [Get a free API key from imgbb](https://api.imgbb.com/) ( estimated time ~1 minute )
- II) (facultative) [Put that in an environment variable](https://www.npmjs.com/package/dotenv)
- III) **imgbbUploader takes _exactly two_ String arguments** : your API key, and the absolute path of your image :

```
var imgbbUploader = require('imgbb-uploader');

imgbbUploader("your-imgbb-api-key-string", "home/absolute/path/to/your/image/image.png")
  .then(response => console.log(response))
  .catch(error => console.error(1))
```

## `.then(response => console.log(response))` output example :

```
{
  id: '5jKj6XV',
  url_viewer: 'https://ibb.co/5jKj6XV',
  url: 'https://i.ibb.co/94Z4Nmj/test.jpg',
  display_url: 'https://i.ibb.co/94Z4Nmj/test.jpg',
  title: 'test',
  time: '1574431312',
  image: {
    filename: 'test.jpg',
    name: 'test',
    mime: 'image/jpeg',
    extension: 'jpg',
    url: 'https://i.ibb.co/94Z4Nmj/test.jpg',
    size: 91264
  },
  thumb: {
    filename: 'test.jpg',
    name: 'test',
    mime: 'image/jpeg',
    extension: 'jpg',
    url: 'https://i.ibb.co/5jKj6XV/test.jpg',
    size: '12875'
  },
  delete_url: 'https://ibb.co/5jKj6XV/ffd8ef0b1c803f02443553535cf4a5f4'
}
```

This async function returns a promise, so this is normal :  
`console.log(imgbbUploader(myKey, myPath)) // output : Promise { <pending> }`  
Your data is available in `.then(response => response)` as shown above.

**This module is tiny & totally unlicensed: to better fit your need, feel free to fork !**  
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

Then you can require this file elsewhere and use something like `path.join(myDirpath, "subfolder", subsubfolder)` to dig into directories programmatically. Once there, you can f.e. `fs.readdir` and iterate `forEach` file of that directory.  
See `fs` documentation and Stack Overflow for more inspiration on the matter.

[CHANGELOG](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/CHANGELOG.md)
