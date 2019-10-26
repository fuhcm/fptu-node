const { Worker } = require("worker_threads");

const remote = __filename =>
  new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: null
    });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", code => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });

module.exports = remote;
