const router = require("express").Router();
const scheduleRoutes = require("./schedules");

router.use("/calendar", scheduleRoutes);

module.exports = router;
