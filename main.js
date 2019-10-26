require("app-module-path/register");
require("dotenv").config();

const { isMainThread } = require("worker_threads");
const app = require("server/app");
const initDB = require("configs/mongodb").initDB;
const cron = require("node-cron");

const main = async () => {
  try {
    await initDB();
    const server = app.createServer();
    const port = process.env.PORT || 5000;
    server.listen(port, () => console.log(`Server listening on port ${port}!`));

    const remoteWorker = require("workers/remote");
    remoteWorker(__filename);

    // Every hour
    cron.schedule("0 * * * *", () => {
      remoteWorker(__filename);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (isMainThread) {
  main();
} else {
  const spawnWorker = require("workers/worker");
  spawnWorker();
}
