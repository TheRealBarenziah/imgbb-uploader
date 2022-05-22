# Upload to Chevereto server

## Install

```bash
npm install imgbb-uploader
```

## Use

```javascript
const cheveretoUploader = require("imgbb-uploader");

const options = {
  apiKey: process.env.CHEVERETO_API_KEY, // MANDATORY

  cheveretoHost: "https://mycheveretoinstance.gg:4443", // MANDATORY

  imagePath: "./your/image/path", // OPTIONAL: pass a local file

  imageUrl: "https://placekitten.com/500/500", // OPTIONAL: pass an URL

  base64string:
    "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVR42mNcLVNbzwAEjDAGACcSA4kB6ARiAAAAAElFTkSuQmCC",
  // OPTIONAL: pass base64-encoded image

  customPayload: {
    nsfw: 1,
    undocumentedFeature: "ERROR_SUCCESS",
  },
  // OPTIONAL: pass arbitrary payload
};

cheveretoUploader(options)
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

This module takes an Object argument and returns a promise: its interface is mostly similar with the one used for imgBB calls.  
**There are a couple differences detailed below:**

# Mandatory params

## apiKey

When logged in Chevereto:

- Click on your profile top-right
- Go to Dashboard
- Go to Settings
- In the dropdown below select API: your API key is there

## cheveretoHost

In the example above, there are 3 important elements in the provided string: `"https://` `mycheveretoinstance.gg` `:4443"`

- Protocol: TLS is default (`https://` can be omitted). **`http://` works but must be provided explicitly.**
- Host: must be defined
- Port: can be omitted (default to standard `:80` for http; `:443` for https) or provided explicitly if needed

## imagePath || imageUrl || base64string

**Exactly one of these 3 keys must be defined!**  
It'll be send to the server as the value of `source` key

## Optional params

**customPayload** is an object that accepts any data you wish.

The key/values will be POST'd along the standard `key` & `source` keys.

It can be used, for example, to specify `nsfw`, `expiration` and others values [allowed by chevereto v4](https://v4-docs.chevereto.com/developer/api/api-v1.html#parameters)  
You can even specify values for the `undocumentedFeature` you've implemented on [your own chevereto-free fork](https://github.com/rodber/chevereto-free)!

## Note about 'format' param

Chevereto API accepts a `format` parameter which default to `json` but accepts `txt` and `redirect` params.  
`txt` output a single URL also present in the JSON, while `redirect` returns a full HTML document (which afaik is more of a PHP paradigm).  
You _COULD_ be allowed to pass that parameter in `customPayload`, yeah, theoretically you could..  
But long story short, **this module won't support `format=redirect` for now.**  
**If you DO have** an actual usecase in your JavaScript app/server, please create an issue and I promise to read you in good faith! 👍
