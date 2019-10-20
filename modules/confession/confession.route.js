const express = require("express");
const router = express.Router();

const jwtMiddleware = require("middlewares/jwt.middleware");

const {
  confessionSendValidator,
  confessionGetByValidator
} = require("modules/confession/confession.schema");

const {
  getAllConfessions,
  getConfessionsBySenderID,
  createNewConfession,
  approveConfession,
  rejectConfession
} = require("modules/confession/confession.handler");

router.route("/").get(jwtMiddleware, getAllConfessions);
router
  .route("/sender_id")
  .post(confessionGetByValidator, getConfessionsBySenderID);
router.route("/").post(confessionSendValidator, createNewConfession);
router.route("/approve").put(jwtMiddleware, approveConfession);
router.route("/reject").put(jwtMiddleware, rejectConfession);

module.exports = router;
