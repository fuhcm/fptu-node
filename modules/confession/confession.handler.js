const db = require("configs/mongodb").getDB();
const errorHandler = require("utils/handlers/error.handler");

const {
  createdTimestamp,
  updatedTimestamp
} = require("utils/parsers/timestamp");
const constants = require("utils/constants/app.constant");

const getAllConfessions = async (req, res) => {
  const confessionCollection = db.collection("confessions");
  const { skip } = req.query;
  const allConfessions = await confessionCollection
    .find()
    .sort({ createdAt: -1 })
    .skip(parseInt(skip) || 0)
    .limit(10)
    .toArray();

  res.send(allConfessions);
};

const getOverview = async (_, res) => {
  const confessionCollection = db.collection("confessions");
  const allConfessions = await confessionCollection.find().count();
  const pendingConfession = await confessionCollection
    .find({ status: 0 })
    .count();
  const rejectedConfession = await confessionCollection
    .find({ status: 2 })
    .count();

  res.send({ allConfessions, pendingConfession, rejectedConfession });
};

const getConfessionsBySenderID = async (req, res) => {
  const confessionCollection = db.collection("confessions");
  const { senderID } = req.body;
  const confessions = await confessionCollection
    .find({ senderID })
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();

  res.send(confessions);
};

const getApprovedConfessions = async (_, res) => {
  const confessionCollection = db.collection("confessions");
  const confessions = await confessionCollection
    .find({ status: 1 })
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();

  res.send(confessions);
};

const searchApprovedConfessions = async (req, res) => {
  const confessionCollection = db.collection("confessions");
  const { keyword } = req.query;
  const confessions = await confessionCollection
    .find({
      status: 1,
      $text: {
        $search: keyword
      }
    })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  res.send(confessions);
};

const createNewConfession = async (req, res) => {
  const confessionCollection = db.collection("confessions");
  const newConfession = req.body;
  const defaultProperties = {
    status: 0,
    approver: null,
    reason: null,
    cfsID: null,
    pushID: null
  };

  const newConfessionFullfilled = {
    ...newConfession,
    ...createdTimestamp(),
    ...defaultProperties
  };

  await confessionCollection.insertOne(newConfessionFullfilled);
  res.send({ message: constants.SUCCESSFULLY_CREATED });
};

const approveConfession = async (req, res) => {
  const confessionCollection = db.collection("confessions");
  const idStr = req.body.id;
  const ObjectID = require("mongodb").ObjectID;

  const getLatestCfsID = async () => {
    const arrData = await confessionCollection
      .find()
      .sort({ cfsID: -1 })
      .limit(1)
      .toArray();
    return (
      (arrData && arrData.length && arrData[0].cfsID + 1) ||
      new Error("Error when get latest cfsID")
    );
  };
  const newCfsID = await getLatestCfsID();

  const { value } = await confessionCollection.findOneAndUpdate(
    {
      _id: ObjectID(idStr),
      status: 0
    },
    {
      $set: {
        status: 1,
        approver: req.nickname,
        cfsID: newCfsID,
        ...updatedTimestamp()
      }
    },
    { new: true }
  );

  res.status(value ? 200 : 422).send(value || { message: "Unable to update" });
};

const rejectConfession = async (req, res) => {
  const confessionCollection = db.collection("confessions");
  const idStr = req.body.id;
  const ObjectID = require("mongodb").ObjectID;
  const { value } = await confessionCollection.findOneAndUpdate(
    {
      _id: ObjectID(idStr),
      status: 0
    },
    {
      $set: {
        status: 2,
        approver: req.nickname,
        reason: req.body.reason || null,
        ...updatedTimestamp()
      }
    },
    { new: true }
  );

  res.status(value ? 200 : 422).send(value || { message: "Unable to update" });
};

module.exports = errorHandler({
  getAllConfessions,
  getOverview,
  getConfessionsBySenderID,
  getApprovedConfessions,
  searchApprovedConfessions,
  createNewConfession,
  approveConfession,
  rejectConfession
});
