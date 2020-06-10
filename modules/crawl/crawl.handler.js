const db = require("configs/mongodb").getDB();
const errorHandler = require("utils/handlers/error.handler");

const getCrawl = async (req, res) => {
  const { tag } = req.params;
  const { load } = req.query;
  const crawlCollection = db.collection("crawls");
  const data = await crawlCollection
    .find({ tag })
    .sort({ $natural: -1 })
    .limit(parseInt(load) || 100)
    .toArray();
  data.reverse()

  res.send(data);
};

const getCrawlDetails = async (req, res) => {
  const { tag, guid } = req.params;
  const crawlCollection = db.collection("crawls");

  const guidStr = `https://daihoc.fpt.edu.vn/?p=${guid}`;
  const guidStrAlternative = `http://daihoc.fpt.edu.vn/?p=${guid}`;
  const data = await crawlCollection.findOne({
    $or: [
      { tag, guid: guidStr },
      { tag, guid: guidStrAlternative },
    ]
  });

  data
    ? res.send(data)
    : res.status(400).send({ message: "Article not found!" });
};

module.exports = errorHandler({ getCrawl, getCrawlDetails });
