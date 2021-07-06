import { readFile } from "fs/promises";
/**
 * Promise to turn an image path into a base64 string
 *
 * @param {string} imagePath - Absolute path to your file
 * @returns {string}
 * A string (base64) representation of your image.
 */

export const fileToString = async (imagePath: string) =>
  await readFile(imagePath, "base64").catch((e: any) => {
    throw new Error(e);
  });

/*
new Promise<string>((resolve, reject) => {
    return readFile(imagePath, "base64", (err: any, data: string) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
*/
