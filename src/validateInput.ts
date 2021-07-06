import fs from "fs";
import { IOptionObject } from "./interfaces";

/**
 * Formally validate input 2 strings params
 *
 * @param {string} apiKey - Should be 32-character long string
 * @param {string} path - Should be a valid file path
 *
 * @returns {Promise.<Boolean>}
 *    A promise that resolve to `true` if things are looking good, and to `false` otherwise
 */

const looksLikeApiKey = (value: string | null) =>
  value && value.length === 32 ? true : false;

export const validateStringInput = async (
  apiKey: string | null,
  path: string,
): Promise<boolean> => {
  const file = await fs.promises
    .lstat(path)
    .then((res) => res.isFile())
    .catch(() => false);
  return file && looksLikeApiKey(apiKey) ? true : false;
};

/**
 * Formally validate option object. Either return proper string or throws
 *
 * @param {IOptions} options - The options object as described in the docs
 *
 * @returns {Promise.<Boolean>}
 *    A promise that resolve to a valid "base64string" value if things are looking good, and throws otherwise
 */

export const validateOptionObject = async (
  options: IOptionObject,
): Promise<string | undefined> => {
  try {
    const {
      imagePath = null,
      apiKey = null,
      // name = null,
      expiration = null,
      base64string = null,
      imageUrl = null,
    } = {
      ...options,
    };
    if (!looksLikeApiKey(apiKey))
      throw new Error("'apiKey' looks invalid (should be 32 characters long).");
    if (expiration) {
      if (Number(expiration) < 60 || Number(expiration) > 15552000) {
        throw new Error("'expiration' value must be in 60-15552000 range.");
      }
    }
    // todo: if(!nameLooksValid(name))
    else {
      const oopsie = Error(
        "A single input key must be defined between: 'imagePath', 'imageUrl', 'base64string'.",
      );
      if (imagePath) {
        if (base64string || imageUrl) throw oopsie;
        if (!validateStringInput(apiKey, imagePath))
          throw Error(`'imagePath' seem invalid (${imagePath})`);
        else return imagePath;
      } else if (base64string) {
        if (imageUrl) throw oopsie;
        else return base64string;
      } else if (imageUrl) {
        // todo: some research on imgBB opinions before pasting a regex
        return imageUrl;
      } else throw oopsie;
    }
  } catch (e) {
    throw new Error(String(e));
  }
};
