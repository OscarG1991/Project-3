import axios from "axios";

export default {
  findEvents: function() {
    return axios.get("/api/calendar");
  },
  findEvent: function(id) {
    return axios.get("/api/calendar/" + id);
  },
  deleteEvent: function(id) {
    return axios.delete("/api/calendar/" + id);
  },
  saveEvent: function(scheduleData) {
    return axios.post("/api/calendar", scheduleData);
  },
  updateEvent: function(id, updateData) {
    return axios.put("/api/calendar/" + id, updateData);
  }
};