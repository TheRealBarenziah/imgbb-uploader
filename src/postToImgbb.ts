import * as https from "https";
import * as querystring from "querystring";

export interface Response {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  size: number;
  time: string;
  expiration: string;
  image: {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
  };
  thumb: {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
  };
  delete_url: string;
}

/**
 * Now using the standard 'https' module instead of 'request' deprecated dependency.
 *
 * To tweak the method, edit 'postToImgbb.ts' with the help of [the docs](https://nodejs.org/api/https.html#https_https_request_options_callback)
 * @param {string} apiKey - Your imgBB API key
 * @param {string} base64string - Typically, the output of fileToString("path") function
 * @returns A promise. Use `.then` as shown in [the README](https://github.com/TheRealBarenziah/imgbb-uploader#use) :
 */

export const postToImgbb = (apiKey: string, base64str: string) =>
  new Promise<Response>((resolve, reject) => {
    const payload = querystring.stringify({
      image: base64str,
    });

    const options = {
      hostname: "api.imgbb.com",
      method: "POST",
      timeout: 5000,
      path: `/1/upload?key=${apiKey}`,
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
          resolve(output);
        });
      })

      .on("error", (err: any) => {
        reject(err);
      });

    req.write(payload);

    req.end();
  });
