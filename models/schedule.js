const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schedules = new Schema({
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  start_time: String,
  end_time: String,
  description: String
});

const Schedule = mongoose.model("Schedule", schedules);

module.exports = Schedule;