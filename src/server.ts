import { Server } from "http";
import app from "./app";
import config from "./config";
import { seedSuperAdmin } from "../prisma/seed";
 

async function main() {
  try {
    await seedSuperAdmin(); // 👈 server start এর আগে seed

    const server: Server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Server startup failed", error);
  }
}

main();
