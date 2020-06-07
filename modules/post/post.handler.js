const db = require("configs/mongodb").getDB();
const errorHandler = require("utils/handlers/error.handler");

const {
  createdTimestamp,
  updatedTimestamp
} = require("utils/parsers/timestamp");

const getAllPosts = async (_, res) => {
  const postCollection = db.collection("posts");
  const allPosts = await postCollection
    .find({})
    .limit(10)
    .toArray();

  res.send(allPosts);
};

const getPostDetails = async (req, res) => {
  const postCollection = db.collection("posts");
  const idStr = req.params.id;
  const ObjectID = require("mongodb").ObjectID;
  const post = await postCollection.findOne({ _id: ObjectID(idStr) });

  res.status(post ? 200 : 404).send(post || { message: "Not found" });
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
  const { title, categories, description, thumbnail, content } = req.body;
  const postCollection = db.collection("posts");
  const ObjectID = require("mongodb").ObjectID;

  const { value } = await postCollection.findOneAndUpdate(
    {
      _id: ObjectID(idStr)
    },
    {
      $set: {
        title, categories, description, thumbnail, content,
        ...updatedTimestamp()
      }
    },
    { returnOriginal: false }
  );

  res.status(value ? 200 : 422).send(value || { message: "Unable to update" });
};

const deletePost = async (req, res) => {
  const idStr = req.params.id;
  const postCollection = db.collection("posts");
  const ObjectID = require("mongodb").ObjectID;

  postCollection.deleteOne({
    _id: ObjectID(idStr)
  });

  res.status({ message: "Delete success" });
};

module.exports = errorHandler({
  getAllPosts,
  getPostDetails,
  createNewPost,
  updatePost,
  deletePost
});
