const express = require("express");
const router = express.Router();

const { getCrawl, getCrawlDetails } = require("modules/crawl/crawl.handler");

router.route("/:tag").get(getCrawl);
router.route("/:tag/:guid").get(getCrawlDetails);

module.exports = router;
