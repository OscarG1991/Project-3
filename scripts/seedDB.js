const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/digitalassistant", { useNewUrlParser: true }
  );

//   const testEvent = [
//       {
//         title: 'meeting',
//         allDay: false,
//         start: new Date(Date.now()),
//         end: new Date(Date.now())
//       }
//   ];

//   console.log("Test Event: ", testEvent);

  db.Schedule
  .deleteMany({})
  .then(() => db.Schedule.collection.insertOne(
    {
        title: 'meeting',
        allDay: false,
        start: new Date(Date.now()),
        end: new Date(Date.now())
      }
  ))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });