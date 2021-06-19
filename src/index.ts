import { fileToString } from "./fileToString";
import { postToImgbb } from "./postToImgbb";
import { validateInput } from "./validateInput";
import ResponseObject from "./responseInterface";

interface IOptions {
  apiKey: string;
  imagePath?: string;
  name?: string;
  expiration?: number;
  base64string?: string;
}

/**
 * Upload files to imgbb API and get display URLs in response. Full doc here: [README](https://github.com/TheRealBarenziah/imgbb-uploader#use)
 * @example
 * // use with option object:
 * const options = {
 *    apiKey: String(process.env.IMGBB_APIKEY),
 *    imagePath: "./images/test.png", // disabled if base64string is defined
 *    // name: "hello-world",
 *    // expiration: 3600, // seconds
 *    // base64string: "iVBORw0KGgoAAAA..." // base64 data
 * };
 *
 * imgbbUploader(options)
 *  .then(res => console.log(res))
 *  .catch(err => console.error(err));
 *
 * // or with two strings:
 * imgbbUploader("your-api-key", "./path/to/file.jpg")
 *   .then(res => console.log(res))
 *   .catch(err => console.error(err));
 */

const imgbbUploader = async (
  ...args: IOptions[] | string[]
): Promise<ResponseObject> => {
  // handle two string params for retrocompatibility
  if (args.length === 2) {
    if (await validateInput.twoStrings(String(args[0]), String(args[1]))) {
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
    // handle option object
    if (args.length === 1 && typeof args[0] === "object") {
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
        throw new Error(String(e));
      }
    } else
      throw new Error(
        `It seems you didn't pass your arguments properly! Please check imgbbUploader documentation here:\nhttps://github.com/TheRealBarenziah/imgbb-uploader/tree/master`,
      );
  }
};

export = imgbbUploader;
