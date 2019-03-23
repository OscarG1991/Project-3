const router = require("express").Router();
const scheduleController = require("../../controllers/scheduleController");

router.route("/calendar")
  .get(scheduleController.findAll)
  .post(scheduleController.create);

router
  .route("/:id")
  .get(scheduleController.findById)
  .put(scheduleController.update)
  .delete(scheduleController.remove);

module.exports = router;
