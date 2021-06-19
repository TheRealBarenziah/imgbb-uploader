export default {
  checkFormat: (name: string) => {
    //
  },
  formatLikeImgbb: (name: string) => {
    /* Facts picked up so far:
  - imgBB treats " " and "%20" the same way. Let's call this Space 
  - Spaces at the start of the end of the string are ignored

*/
    return Boolean(name);
  },
};
