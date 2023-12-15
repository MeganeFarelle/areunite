const nedb = require("gray-nedb");

class EventsModel {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB connected to " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }

  init() {
    this.db.insert({
      title: "Tiger Land Festival",
      description:
        "Lorem ipsum dolor sit amet, consectetur do adipiscing eliterirt sed eiusmod alori...",
      date: "2019-02-01",
      time_start: "12:00",
      time_end: "23:00",
      available_tickets: 100,
      location: "Tiger Land",
      category: "networking",
      image:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D",
      guests: 400,
      createdBy: "user",
    });

    this.db.insert({
      title: "Tiger Land Festival",
      description:
        "Lorem ipsum dolor sit amet, consectetur do adipiscing eliterirt sed eiusmod alori...",
      date: "2019-02-01",
      time_start: "12:00",
      time_end: "23:00",
      available_tickets: 100,
      location: "Tiger Land",
      category: "networking",
      image:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D",
      guests: 400,
      createdBy: "user",
    });

    console.log("inserted");
  }

  getAllEvents() {
    return new Promise((resolve, reject) => {
      this.db.find({}, function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  getEvent(id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id: id }, function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  addEvent(newEvent) {
    return new Promise((resolve, reject) => {
      this.db.insert(newEvent, (err, event) => {
        if (err) {
          reject(err);
        } else {
          resolve(event);
        }
      });
    });
  }

  updateEvent(id, event) {
    return new Promise((resolve, reject) => {
      this.db.update({ _id: id }, event, {}, (err, numReplaced) => {
        if (err) {
          reject(err);
        } else {
          resolve(numReplaced);
        }
      });
    });
  }

  deleteEvent(id) {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    });
  }
}

module.exports = EventsModel;
