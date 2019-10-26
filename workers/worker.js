const { parentPort } = require("worker_threads");

const getFeed = require("utils/rss2json/rss2json");

const initDB = async () => {
  const MongoClient = require("mongodb").MongoClient;
  const url = "mongodb://localhost:27017/nodejs";

  const client = await MongoClient.connect(process.env.MONGODB_URI || url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = client.db();
  return db;
};

const worker = async () => {
  const db = await initDB();
  const crawlsCollection = db.collection("crawls");

  const data = await getFeed("https://daihoc.fpt.edu.vn/feed");
  try {
    const taggedData = data.map(e => ({ ...e, tag: "fpt" }));
    await crawlsCollection.insertMany(taggedData);
  } catch (err) {}

  parentPort.postMessage(true);
  console.log("Fetched RSS at: ", new Date().toISOString());
};

module.exports = worker;
