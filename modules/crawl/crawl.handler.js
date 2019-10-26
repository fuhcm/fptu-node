const db = require("configs/mongodb").getDB();
const errorHandler = require("utils/handlers/error.handler");

const getCrawl = async (req, res) => {
  const { tag } = req.params;
  const crawlsCollection = db.collection("crawls");
  const data = await crawlsCollection
    .find({ tag })
    .limit(10)
    .toArray();

  res.send(data);
};

module.exports = errorHandler({ getCrawl });
