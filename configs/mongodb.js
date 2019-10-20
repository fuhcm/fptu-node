const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "nodejs";

const useState = require("utils/closures/useState");
const [db, setDb] = useState(null);

const initDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI || url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    client
      .db(dbName)
      .collection("confessions")
      .createIndex({
        content: "text"
      });

    setDb(client.db(dbName));
    return true;
  } catch (err) {
    throw err;
  }
};

const getDB = () => db() || new Error("Connect to DB failed!");

const closeDB = () => db().close();

module.exports = { getDB, initDB, closeDB };
