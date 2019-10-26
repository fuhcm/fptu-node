const express = require("express");
const router = express.Router();

const { getCrawl } = require("modules/crawl/crawl.handler");

router.route("/:tag").get(getCrawl);

module.exports = router;
