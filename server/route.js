const express = require("express");
const router = express.Router();

const authenRoutes = require("modules/authen/authen.route");
const userRoutes = require("modules/user/user.route");
const confessionRoutes = require("modules/confession/confession.route");
const changeRoutes = require("modules/change/change.route");
const crawlRoutes = require("modules/crawl/crawl.route");

router.use("/auth", authenRoutes);
router.use("/users", userRoutes);
router.use("/confessions", confessionRoutes);
router.use("/change", changeRoutes);
router.use("/crawl", crawlRoutes);

module.exports = router;
