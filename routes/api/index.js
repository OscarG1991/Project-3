const router = require("express").Router();
const scheduleRoutes = require("./schedules");

// Book routes
router.use("/", scheduleRoutes);

module.exports = router;
