const express = require("express");
const router = express.Router();

const { signHandler, getAllSign } = require("modules/change/change.handler");

router.route("/sign").post(signHandler);
router.route("/").get(getAllSign);

module.exports = router;
