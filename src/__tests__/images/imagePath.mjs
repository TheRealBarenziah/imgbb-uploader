// *visible confusion* https://stackoverflow.com/a/62892482
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default path.join(__dirname);
