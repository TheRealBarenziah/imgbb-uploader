import fs from "fs";
/**
 * Promise to turn an image path into a base64 string
 *
 * @param {string} imagePath - Absolute path to your file
 * @returns {string}
 * A string (base64) representation of your image.
 */

export const fileToString = (imagePath: string) =>
  fs.promises.readFile(imagePath, "base64").catch((e: any) => {
    throw e;
  });
