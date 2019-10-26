const db = require("configs/mongodb").getDB();
const errorHandler = require("utils/handlers/error.handler");

const {
  createdTimestamp,
  updatedTimestamp
} = require("utils/parsers/timestamp");

const getAllPosts = async (_, res) => {
  const postCollection = db.collection("posts");
  const allPosts = await postCollection.find({}).toArray();

  res.send(allPosts);
};

const createNewPost = async (req, res) => {
  const post = req.body;
  const postCollection = db.collection("posts");
  const { insertedId } = await postCollection.insertOne({
    ...post,
    author: req.nickname,
    type: "markdown",
    ...createdTimestamp()
  });

  res.send({ id: insertedId });
};

const updatePost = async (req, res) => {
  const idStr = req.params.id;
  const { content } = req.body;

  const { value } = await postCollection.findOneAndUpdate(
    {
      _id: ObjectID(idStr)
    },
    {
      $set: {
        content,
        ...updatedTimestamp()
      }
    },
    { returnOriginal: false }
  );

  res.status(value ? 200 : 422).send(value || { message: "Unable to update" });
};

module.exports = errorHandler({ getAllPosts, createNewPost, updatePost });
