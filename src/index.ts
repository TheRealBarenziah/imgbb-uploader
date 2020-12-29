import { fileToString } from "./fileToString";
import { postToImgbb } from "./postToImgbb";
import { validateInput } from "./validateInput";
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

interface IOptions {
  apiKey: string;
  imagePath: string;
  name: string | undefined;
  expiration: number | undefined;
}

const imgbbUploader = async (...args: string[] | IOptions[]) => {
  // handle two string params to ensure retrocompatibility
  if (args.length === 2) {
    if (await validateInput(String(args[0]), String(args[1]))) {
      console.log("validated");
      return postToImgbb({
        apiKey: String(args[0]),
        base64str: await fileToString(String(args[1])),
        name: null,
        expiration: null,
      });
    } else {
      throw new Error(
        "Invalid params: please make sure that first argument is an imgBB API key, and second argument is a valid path to image file.",
      );
    }
  } else if (args.length === 1 && typeof args[0] === "object") {
    const { imagePath, apiKey, name = null, expiration = null } = {
      ...args[0],
    };
    return postToImgbb({
      apiKey: String(apiKey),
      base64str: await fileToString(String(imagePath)),
      name: name ? String(name) : null,
      expiration: expiration ? Number(expiration) : null,
    });
  } else
    throw new Error(
      `It seems you didn't pass your arguments properly! Please check imgbbUploader documentation here:\nhttps://github.com/TheRealBarenziah/imgbb-uploader/tree/master`,
    );
};

export = imgbbUploader;
