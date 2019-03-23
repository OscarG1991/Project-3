const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schedules = new Schema({
  title: String,
  allDay: Boolean,
  start: { type: Date, required: true },
  end: { type: Date, required: true }
});

const Schedule = mongoose.model("Schedule", schedules);

module.exports = Schedule;

//On "Add Event" click, modal to add event
//mongoose posts to mongodb, then a get request to post to the calendar
