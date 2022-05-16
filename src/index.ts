import { fileToString } from "./fileToString";
import { postToImgbb } from "./postToImgbb";
import { validateOptionObject, validateStringInput } from "./validateInput";
import { IOptionObject, IResponseObject } from "./interfaces";
import { postToChevereto } from "./postToChevereto";

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
 * @param {string} options.imageUrl - URL of your image (32Mb max)
 *
 * @returns {Promise.<ResponseObject>}
 * A promise. Access your data using `.then` as shown in [the README](https://github.com/TheRealBarenziah/imgbb-uploader#use) :
 *
 * @example
 *     imgbbUploader("your-api-key", "/absolute/path/to/file.jpg")
 *       .then(res => console.log(res))
 *       .catch(err => console.error(err))
 */
const imgbbUploader = async (
  ...args: string[] | IOptionObject[]
): Promise<IResponseObject> => {
  // handle two string params to ensure retrocompatibility
  if (args.length === 2) {
    if (await validateStringInput(String(args[0]), String(args[1]))) {
      const image = await fileToString(String(args[1]));
      return postToImgbb({
        apiKey: String(args[0]),
        image,
      });
    } else {
      throw new Error(
        "Invalid params: please make sure that first argument is an imgBB API key, and second argument is a valid path to image file.",
      );
    }
  } else {
    if (args.length === 1 && typeof args[0] === "object") {
      // handle the option object
      const {
        apiKey,
        name,
        expiration,
        cheveretoHost,
        cheveretoHttps,
        cheveretoPort,
      } = { ...args[0] };
      try {
        // ensure there is a single defined key between 'imagePath', 'imageUrl' & 'base64string'
        const image = await validateOptionObject({ ...args[0] });

        // no cheveretoHost defined => post to imgBB
        if (!cheveretoHost) {
          return postToImgbb({
            apiKey: String(apiKey),
            image, // Dear TS, reaching here means 'image' is defined (otherwise we would be in the catch block)
            name,
            expiration,
          });
        }

        // cheveretoHost is defined: handle chevereto case
        else {
          return postToChevereto({
            apiKey: String(apiKey),
            image,
            cheveretoHost,
            cheveretoHttps,
            cheveretoPort,
          });
        }
      } catch (e) {
        throw new Error(String(e));
      }
    } else
      throw new Error(
        `It seems you didn't pass your arguments properly! Please check imgbbUploader documentation here:\nhttps://github.com/TheRealBarenziah/imgbb-uploader/tree/master`,
      );
  }
};

export = imgbbUploader;
