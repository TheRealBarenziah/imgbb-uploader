import * as https from "https";
import * as querystring from "querystring";
import ResponseObject from "./responseInterface";

/**
 * Now using the standard 'https' module instead of 'request' deprecated dependency.
 *
 * To tweak the method, edit 'postToImgbb.ts' with the help of [the docs](https://nodejs.org/api/https.html#https_https_request_options_callback)
 * @param {string} apiKey - Your imgBB API key
 * @param {string} base64string - Typically, the output of fileToString("path") function
 *
 * @returns A promise. Use `.then` as shown in [the README](https://github.com/TheRealBarenziah/imgbb-uploader#use) :
 */

interface IPostParams {
  apiKey: string;
  base64str: string;
  name?: string;
  expiration?: number;
}

export const postToImgbb = (params: IPostParams) =>
  new Promise<ResponseObject>((resolve, reject) => {
    const { apiKey, base64str, name = null, expiration = null } = { ...params };

    const payload = querystring.stringify({
      image: base64str,
    });

    let query = `/1/upload?key=${apiKey}`;
    if (name) query += `&name=${name}`;
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
          const output = JSON.parse(response).data;
          output
            ? resolve(output)
            : reject(
                new Error(
                  "There was a problem with imgBB, please check your inputs",
                ),
              );
        });
      })

      .on("error", (err: any) => {
        reject(new Error(err));
      });

    req.write(payload);

    return req.end();
  });
