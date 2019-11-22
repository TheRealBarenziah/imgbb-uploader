# imgbb-uploader
### Lightweight nodejs module to easily upload images through imgbb API

## Compatibility: 
Node >= 8 recommended ( [this module uses async/await](https://node.green/) )

## Install
`npm install imgbb-uploader`

## Use
- I) [Get a free API key from imgbb](https://api.imgbb.com/) ( estimated time : ~1 minute )
- II) (facultative) [Put that key in an environment variable](https://www.npmjs.com/package/dotenv)
- III) **imgbbUploader takes *exactly two* String arguments** : your API key, then the absolute path of your image :

```
var imgbbUploader = require('imgbb-uploader');

imgbbUploader("your-imgbb-api-key-string", "home/absolute/path/to/your/image/image.png")
  .then(response => console.log(response))
  .catch(error => console.log(error))
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

This function returns a promise, this is why :
`console.log(imgbbUploader(myKey, myPath)) // output : Promise { <pending> }`
Your data is available in the `.then(response => response)` as shown above.


## Learn more
This module doesn't support array uploads and other fancy stuff. For heavy duty uploads, you'll probably have to work with [fs.readdir](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback) and [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) methods ; in that case you may also be interested in [path](https://nodejs.org/api/path.html#path_path). 

For example, you can create a `baseDir.js` file wherever it suits you:
```
// baseDir.js
const path = require('path');
const dirPath = path.join(__dirname);
module.exports = dirPath;
```
Then you can require this file elsewhere, and use something like `path.join(myDirpath, "subfolder", "subsubfolder")` to dig into directories programmatically. Once you're there you can `fs.readdir` and iterate `forEach` file of that directory, then do whatever you want. 
That is just a simple example, see `fs` documentation and Stack Overflow for more inspiration.

### Anyway, this module is ~20 lines long & totally unlicensed, so even the most junior Nodejs dev should be able to easily adapt it to its needs.