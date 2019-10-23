const express = require("express");
const router = express.Router();

const { signHandler, getAllSign } = require("modules/chage/sign.handler");

router.route("/sign").post(signHandler);
router.route("/").post(getAllSign);

module.exports = router;
