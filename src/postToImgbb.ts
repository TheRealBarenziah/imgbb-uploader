/* eslint-disable */
import * as https from "https";
import * as querystring from "querystring";
import { IOptionObject, IResponseObject } from "./interfaces";

/**
 * Now using the standard 'https' module instead of 'request' deprecated dependency.
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

export const postToImgbb = (params: IPostParams) =>
  new Promise<IResponseObject>((resolve, reject) => {
    const { apiKey, image, name = null, expiration = null } = { ...params };

    // query string & payload structures are different for imgBB & chevereto-free
    let query = `/1/upload?key=${apiKey}`;
    const payload = querystring.stringify({
      image,
    });

    if (name) query += `&name=${encodeURIComponent(name)}`;
    if (expiration) query += `&expiration=${expiration}`;

    const options = {
      hostname: "api.imgbb.com",
      method: "POST",
      timeout: 5000,
      path: query,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": payload.length,
      },
    };

    const req = https
      .request(options, (res: any) => {
        let response = "";

        res.on("data", (d: string) => {
          response += d;
        });

        res.on("end", () => {
          if (JSON.parse(response).error) {
            const error = {
              message: "There was a problem with imgBB API",
              imgbbApiResponse: JSON.parse(response),
            };
            reject(new Error(JSON.stringify(error, null, 4)));
          } else {
            const output = JSON.parse(response).data;
            resolve(output);
          }
        });
      })

      .on("error", (err: any) => {
        reject(new Error(err));
      });

    req.write(payload);

    return req.end();
  });
