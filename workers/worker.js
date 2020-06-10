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
  try {
    const db = await initDB();
    const crawlCollection = db.collection("crawls");
    const data = await getFeed("https://daihoc.fpt.edu.vn/feed");
    const taggedData = data.map(e => ({ ...e, tag: "fpt" }));
    await crawlCollection.insertMany(taggedData);
    console.log("Fetched RSS at: ", new Date().toISOString());
  } catch (err) {
    console.error("Error: ", err.toString());
    console.error("Fetch error, maybe duplicated");
    console.error("Fetch RSS failed at: ", new Date().toISOString());
  }
};

module.exports = worker;
