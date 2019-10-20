const express = require("express");
const router = express.Router();

const jwtMiddleware = require("middlewares/jwt.middleware");

const {
  confessionSendValidator,
  confessionGetByValidator
} = require("modules/confession/confession.schema");

const {
  getAllConfessions,
  getOverview,
  getConfessionsBySenderID,
  getApprovedConfessions,
  searchApprovedConfessions,
  createNewConfession,
  approveConfession,
  rejectConfession,
  syncPushID
} = require("modules/confession/confession.handler");

router.route("/").get(jwtMiddleware, getAllConfessions);
router.route("/overview").get(getOverview);
router
  .route("/myconfess")
  .post(confessionGetByValidator, getConfessionsBySenderID);
router.route("/approved").get(getApprovedConfessions);
router.route("/search").get(searchApprovedConfessions);
router.route("/").post(confessionSendValidator, createNewConfession);
router.route("/approve").put(jwtMiddleware, approveConfession);
router.route("/reject").put(jwtMiddleware, rejectConfession);
router.route("/sync").put(syncPushID);

module.exports = router;
