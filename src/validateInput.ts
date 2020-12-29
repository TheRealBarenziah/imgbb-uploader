const fs = require("fs").promises;

/**
 * Formally validate input params
 *
 * @param {string} apiKey - Should be 32-character long string
 * @param {string} path - Should be a valid file path
 * @returns {Promise.<Boolean>}
 *    A promise that resolve to `true` if things are looking good, and otherwise resolve to `false`
 */
export const validateInput = async (apiKey: string, path: string) => {
  const presumedFile = await fs.lstat(path);
  if (
    apiKey.length === 32 && // imgBB API keys being 32 characters long is empiric knowledge
    (await presumedFile.isFile()) // Using fs.lstat to ensure there is a file to upload
  ) {
    return true;
  } else return false;
};
