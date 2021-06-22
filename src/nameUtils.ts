export default {
  checkFormat: (name: string) => {
    //
  },
  generateFunkyName: () => {
    // extends this snippet: https://stackoverflow.com/a/1349426
    const stringLen = Math.floor(Math.random() * 200);
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~*'()#;,/?:@&=+$%   ";
    const funkyStuff = ["🀄", "🧣", "🥧", "🧚", "%22", "%20"];
    let body = "";
    let prefix = "  ";
    let suffix = "  ";
    for (let i = 0; i < stringLen; i++) {
      body += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    for (let i = 0; i < funkyStuff.length; i++) {
      prefix += funkyStuff[Math.floor(Math.random() * funkyStuff.length)];
      suffix += funkyStuff[Math.floor(Math.random() * funkyStuff.length)];
    }

    return `${prefix}${body}${suffix}`;
  },
  formatLikeImgbb: (name: string) => {
    /* Facts picked up so far:
  - imgBB treats " " and "%20" the same way. Let's call this Space 
  - posting a single Space as name param returns "image" as res.image.name (their default value, it seem)
  - All Spaces at the start AND the end of the string are ignored
  - Spaces will be turned into "-" in the returned name. " aegon targaryen" => "aegon-targaryen"
  - Special characters [_.!~*'();,/?:@&=+$] and the gang are ignored. 
  - Recognized characters are [a-zA-20-9 -].
  - [a-zA-Z0-9] are Text characters, while "-" === " " === "%20" in this context (Space)
  - Text Block, for imgBB, is at least a single Text character, either alone or separated by at least 1 Space from another Text Block
  - When there are more than one Space (or unrecognized character) between two Text Blocks, they are ignored (minus one)
  - Maximum length for res.image.name is 100
  - But it will be 99 if the 100th character of the string is a Space 
  -(even if followed by Text Block in the longer string, it won't insert the "-" at string[99] in that case)

  - /e SHOULD out "Hello-There-1" FOR IN "%20%20Hello%20There%22%99--1"
*/

    // Ignore shady characters
    const alphanumString = name.replace(/[^a-zA-Z0-9%-\s]/g, "");
    // Turn '%20's into '-'s for convenience, then remove other "%"s
    const epuredStringIr = alphanumString
      .replace(/%20| /g, "-")
      .replace(/%/g, "");
    // Lets switch in Array mode to remove the multiple "-"s
    const goodOleArray = [...epuredStringIr];
    const epured = goodOleArray.map((char, i) => {
      if (char === "-") {
        if (goodOleArray[i + 1] !== "-") {
          return char;
        }
      } else return char;
    });
    // And to remove the "-"s at the start & end of string:
    const padded = epured
      .join("")
      .split("-")
      .filter((c) => (c ? 1 : 0))
      .join("-");

    // Almost there, all we need now is to enforce the "100char maximum, 99 if string[99] === '-'" rule
    const directorsCut = padded.slice(0, 99);
    switch (directorsCut[99]) {
      case "-":
        return directorsCut.slice(0, -1);
      default:
        return directorsCut;
    }
  },
};
