import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv to look for .env file in the root directory
dotenv.config({ path: path.join(__dirname, "../../.env") });

const TOKEN = process.env.MAILTRAP_TOKEN;
if (!TOKEN) {
  console.log("Token not present");
  throw new Error("MAILTRAP_TOKEN is not set in environment variables");
}
const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "CBL Admin",
};

export { mailtrapClient, sender };
