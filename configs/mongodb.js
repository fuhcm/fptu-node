const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "nodejs";

const useState = require("utils/closures/useState");
const [db, setDb] = useState(null);

const initDB = async () => {
  try {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
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
