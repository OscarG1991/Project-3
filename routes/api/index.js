const router = require("express").Router();
const scheduleRoutes = require("./schedules");

router.use("/", scheduleRoutes);

module.exports = router;
