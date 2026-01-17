import app from "./app";
import { configDotenv } from "dotenv";

configDotenv({ path: "./.env" });

async function main() {
    try {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.log(error);
    }
}

main();