import { fileToString } from "./fileToString";
import { postToImgbb } from "./postToImgbb";
import { validateInput } from "./validateInput";

interface IOptions {
  apiKey: string;
  imagePath?: string;
  name?: string;
  expiration?: number;
  base64string?: string;
}

/**
 * Upload local pictures files to imgbb API and get display URLs in response.
 *
 * @param {string} apiKey - Your imgBB API key
 * @param {string} pathToFile - Path to your file
 *
 * @param {Object} options - OPTIONAL: pass Option object as parameter
 * @param {string} options.apiKey - Your imgBB API key
 * @param {string} options.imagePath - Path to your image
 * @param {string} options.name - Custom name for your file
 * @param {string} options.expiration - Expiration value in seconds
 * @param {string} options.base64string - Upload a base64 string (alternative to options.imagePath)
 *
 * @returns {Promise.<ResponseObject>}
 *    A promise. Access your data using `.then` as shown in [the README](https://github.com/TheRealBarenziah/imgbb-uploader#use) :
 *
 * @example
 *     imgbbUploader("your-api-key", "/absolute/path/to/file.jpg")
 *       .then(res => console.log(res))
 *       .catch(err => console.error(err))
 */
const imgbbUploader = async (...args: string[] | IOptions[]) => {
  // handle two string params to ensure retrocompatibility
  if (args.length === 2) {
    if (await validateInput(String(args[0]), String(args[1]))) {
      return postToImgbb({
        apiKey: String(args[0]),
        base64str: await fileToString(String(args[1])),
      });
    } else {
      throw new Error(
        "Invalid params: please make sure that first argument is an imgBB API key, and second argument is a valid path to image file.",
      );
    }
  } else {
    if (args.length === 1 && typeof args[0] === "object") {
      // handle the option object
      const { imagePath, apiKey, name, expiration, base64string } = {
        ...args[0],
      };
      try {
        return postToImgbb({
          apiKey: String(apiKey),
          base64str: base64string // if base64string is provided, skip fs call
            ? base64string
            : await fileToString(String(imagePath)),
          name,
          expiration,
        });
      } catch (e) {
        throw new Error(e);
      }
    } else
      throw new Error(
        `It seems you didn't pass your arguments properly! Please check imgbbUploader documentation here:\nhttps://github.com/TheRealBarenziah/imgbb-uploader/tree/master`,
      );
  }
};

export = imgbbUploader;
