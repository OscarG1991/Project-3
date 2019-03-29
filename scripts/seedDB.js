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
  .then(() => db.Schedule.collection.insertMany([
    {
      title: 'meeting',
      start: new Date("2019-03-29T11:00Z"),
      end: new Date("2019-03-29T12:00Z")
    },
    {
      title: 'presentations',
      start: new Date("2019-04-06T10:00Z"),
      end: new Date("2019-04-06T14:00Z")
    },
    {
      title: 'meeting',
      start: new Date("2019-04-03T11:00Z"),
      end: new Date("2019-04-03T12:00Z")
    }


  ]
  ))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });