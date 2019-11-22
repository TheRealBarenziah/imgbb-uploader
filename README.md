# imgbb-uploader
## A lightweight module to easily upload images through imgbb API

## Compatibility: 
Node version >= 8 is recommended since this module uses async/await [(learn more)]("https://node.green/")

## Install
`npm install imgbb-uploader`

## Usage
- [First get a free API key from imgbb (estimated time ~1 minute)]("https://api.imgbb.com/")
- (facultative) [Put that key in an environment variable]("https://www.npmjs.com/package/dotenv")
- imgbbUploader takes exactly two string arguments; first your API key, then the absolute path of your image

```
var imgbbUploader = require('imgbb-uploader');

imgbbUploader("your-api-key-string", "absolute-path-to-your-image-string")
  .then(response => console.log(response))
  .catch(error => console.log(error))
```

Output example of `.then(response => console.log(response))`:
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

This function returns a promise, this is why `console.log(imgbbUploader(myKey, myPath) // output : Promise { <pending> }`
You access it in your `.then(res => res)` as shown above.

This module doesn't support array uploads and other fancy stuff. For heavy duty uploads, you'll probably have to work with [fs.readdir]('https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback') and [forEach]('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach') methods.


In which case you may also be interested in [path]("https://nodejs.org/api/path.html#path_path"). For example, you can create a `baseDir.js` file wherever your images are:
```
// baseDir.js
const path = require('path');
const dirPath = path.join(__dirname);
module.exports = dirPath;
```
Then you can require this file elsewhere, and use something like `path.join(myDirpath, "subfolder", "subsubfolder")` to cross directories programmatically. Once you're there you can `fs.readdir` and iterate `forEach` file of that directory, then do whatever you want. That is just a simple example, see `fs` documentation and Stack Overflow for more inspiration.

## Anyway, the module is ~20 lines long & totally unlicensed, so even the most junior Nodejs dev should be able to easily adapt it to its needs.