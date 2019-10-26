const express = require("express");
const router = express.Router();

const jwtMiddleware = require("middlewares/jwt.middleware");
const { postValidator, putValidator } = require("modules/post/post.schema");
const {
  getAllPosts,
  createNewPost,
  updatePost
} = require("modules/post/post.handler");

router.route("/").get(getAllPosts);
router.route("/").post(jwtMiddleware, postValidator, createNewPost);
router.route("/:id").put(jwtMiddleware, putValidator, updatePost);

module.exports = router;
