import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);

export default _dirname;