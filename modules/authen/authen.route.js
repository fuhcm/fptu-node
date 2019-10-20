const express = require("express");
const router = express.Router();

const { googleLoginHandler } = require("modules/authen/authen.handler");

router.route("/google").post(googleLoginHandler);

module.exports = router;
