import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const landingPage = readFileSync(join(__dirname, "landing-page.html"), "utf-8");
