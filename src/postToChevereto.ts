/* eslint-disable */
import { request as httpRequest } from "http";
import { request as httpsRequest } from "https";
import * as querystring from "querystring";
import { IOptionObject, IResponseObject } from "./interfaces";

/**
 * Now using the standard nodejs modules instead of 'request' deprecated dependency.
 *
 * To tweak the method, edit 'postToImgbb.ts' with the help of [the docs](https://nodejs.org/api/https.html#https_https_request_options_callback)
 *
 * @param {string} apiKey - Your imgBB API key
 * @param {string} image - Typically, the output of fileToString("path") function
 *
 * @returns A promise. Use `.then` as shown in [the README](https://github.com/TheRealBarenziah/imgbb-uploader#use) :
 */

interface IPostParams extends IOptionObject {
  image: string;
}

export const postToChevereto = (params: IPostParams) =>
  new Promise<IResponseObject>((resolve, reject) => {
    const { apiKey, image, cheveretoHost = "" } = { ...params };
    let query = "/api/1/upload";

    const payload = querystring.stringify({
      source: image,
      key: apiKey,
    });

    // Infer relevant request module by parsing cheveretoHost; default to https unless explicitly given 'http://'
    const requestFunk = cheveretoHost.split("://")[0] === "http" ? httpRequest : httpsRequest;
    const hostname = cheveretoHost.includes("://") ? cheveretoHost.split("://")[1] : cheveretoHost;

    // TODO: if exists, parse explicit port by splitting ':'

    const options = {
      hostname,
      method: "POST",
      timeout: 5000,
      path: query,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": payload.length,
      },
      rejectUnauthorized: false,
    };

    const req = requestFunk(options, (res: any) => {
      let response = "";
      res.on("data", (d: string) => {
        response += d;
      });

      res.on("end", () => {
        try {
          if (response) {
            const output = JSON.parse(response);
            // We still need to discriminate between error & success
            if (output.error) {
              const error = {
                message: `${cheveretoHost} API returned an error`,
                cheveretoResponse: output,
              };
              reject(new Error(JSON.stringify(error, null, 4)));
            } else {
              resolve(output);
            }
          } else {
            reject(new Error(`Something went wrong: ${cheveretoHost} response was empty.`));
          }
          return response;
        } catch (error) {
          reject(new Error(String(error)));
        }
      });
    }).on("error", (err: any) => {
      reject(new Error(String(err)));
    });

    req.write(payload);

    return req.end();
  });
