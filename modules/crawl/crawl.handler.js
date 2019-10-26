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

const getCrawlDetails = async (req, res) => {
  const { tag, guid } = req.params;
  const crawlsCollection = db.collection("crawls");

  const guidStr = `http://daihoc.fpt.edu.vn/?p=${guid}`;
  const data = await crawlsCollection.findOne({ tag, guid: guidStr });

  data
    ? res.send(data)
    : res.status(400).send({ message: "Article not found!" });
};

module.exports = errorHandler({ getCrawl, getCrawlDetails });
