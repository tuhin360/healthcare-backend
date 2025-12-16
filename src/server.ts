import { Server } from "http";
import app from "./app";
import config from "./config";
import { seedSuperAdmin } from "../prisma/seed";

let server: Server;

async function main() {
  try {
    // server start হওয়ার আগে super admin seed হবে
    await seedSuperAdmin();

    server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Server startup failed", error);
  }
}

// graceful shutdown handler
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed gracefully");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// uncaught exception
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  exitHandler();
});

// unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  exitHandler();
});

main();
