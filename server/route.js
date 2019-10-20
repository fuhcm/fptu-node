const express = require("express");
const router = express.Router();

const authenRoutes = require("modules/authen/authen.route");
const userRoutes = require("modules/user/user.route");
const confessionRoutes = require("modules/confession/confession.route");

router.use("/auth", authenRoutes);
router.use("/users", userRoutes);
router.use("/confessions", confessionRoutes);

module.exports = router;
