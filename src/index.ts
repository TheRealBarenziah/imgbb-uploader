import { fileToString } from "./fileToString";
import { postToImgbb } from "./postToImgbb";

/**
 * Upload local pictures files to imgbb API and get display URLs in response.
 *
 * @param {string} apiKey - Your imgBB API key
 * @param {string} pathToFile - Absolute path to your file
 * @returns {Promise.<ResponseObject>}
 *    A promise. Access your data using `.then` as shown in [the README](https://github.com/TheRealBarenziah/imgbb-uploader#use) :
 * @example
 *     imgbbUploader("your-api-key", "/absolute/path/to/file.jpg")
 *       .then(res => console.log(res))
 *       .catch(err => console.error(err))
 */

const imgbbUploader = async (...args: string[] | Object[]) => {
  console.log("args = ", args);
  if (args.length === 2) {
    const base64string = await fileToString(String(args[0]));
    return postToImgbb({ apiKey: String(args[1]), file: await base64string });
  } else if (args.length === 1 && typeof args[0] === "object") {
    const { imagePath, apiKey, name, expiration } = { ...args[0] };
    const base64string = await fileToString(String(imagePath));
    return postToImgbb({
      apiKey: String(apiKey),
      file: await base64string,
      name: String(name),
      expiration: Number(expiration),
    });
  } else
    throw new Error(
      `It seems you didn't pass your arguments properly! Please check imgbbUploader documentation here:\nhttps://github.com/TheRealBarenziah/imgbb-uploader/tree/master`,
    );
};

export = imgbbUploader;
