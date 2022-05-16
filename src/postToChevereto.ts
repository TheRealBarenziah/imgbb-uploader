/* eslint-disable */
import { request as httpRequest } from "http";
import { request as httpsRequest } from "https";
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

export const postToChevereto = (params: IPostParams) =>
  new Promise<IResponseObject>((resolve, reject) => {
    const {
      apiKey,
      image,
      cheveretoHost = null,
      cheveretoHttps = null,
      cheveretoPort = null,
    } = { ...params };
    /* tslint:disable-next-line */
    let query = "/api/1/upload";
    const payload = querystring.stringify({
      source: image,
      key: apiKey,
    });

    const options = {
      hostname: cheveretoHost,
      method: "POST",
      timeout: 5000,
      path: query,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": payload.length,
      },
    };

    const req = httpRequest(options, (res: any) => {
      let response = "";

      res.on("data", (d: string) => {
        response += d;
      });

      res.on("end", () => {
        /* tslint:disable-next-line */
        console.log("cheveretohost is defined. response nani ? ", response);
        return response;
      });
    }).on("error", (err: any) => {
      reject(new Error(err));
    });

    req.write(payload);

    return req.end();
  });
