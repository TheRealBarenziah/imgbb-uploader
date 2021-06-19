import fs from "fs";

/**
 * Formally validate input params
 *
 * @param {string} apiKey - Should be 32-character long string
 * @param {string} path - Should be a valid file path
 *
 * @returns {Promise.<Boolean>}
 *    A promise that resolve to `true` if things are looking good, and to `false` otherwise
 */

export const validateInput = {
  twoStrings: async (apiKey: string, path: string): Promise<boolean> => {
    const file = await fs.promises
      .lstat(path)
      .then((res) => res.isFile())
      .catch(() => false);
    return file && apiKey.length === 32 ? true : false;
  },
  name: async (name: string) => {
    //
  },
};
