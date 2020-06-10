require("app-module-path/register");
require("dotenv").config();

const app = require("server/app");
const initDB = require("configs/mongodb").initDB;
const cron = require("node-cron");
const worker = require("workers/worker");

const main = async () => {
  try {
    await initDB();
    const server = app.createServer();
    const port = process.env.PORT || 5000;
    server.listen(port, () => console.log(`Server listening on port ${port}!`));

    // Call on first launch
    await worker();

    // Every hour
    cron.schedule("0 * * * *", async () => {
      await worker();
    }, null);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main().then(() => () => {});
