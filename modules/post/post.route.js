const express = require("express");
const router = express.Router();

const jwtMiddleware = require("middlewares/jwt.middleware");
const { postValidator, putValidator } = require("modules/post/post.schema");
const {
  getAllPosts,
  getPostDetails,
  createNewPost,
  updatePost,
  deletePost
} = require("modules/post/post.handler");

router.route("/").get(getAllPosts);
router.route("/:id").get(getPostDetails);
router.route("/").post(jwtMiddleware, postValidator, createNewPost);
router.route("/:id").put(jwtMiddleware, putValidator, updatePost);
router.route("/:id").delete(jwtMiddleware, deletePost);

module.exports = router;
