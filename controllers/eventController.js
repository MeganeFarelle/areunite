const router = require("../routes/eventRoutes");
const { dbEvents } = require("../ds");
// db.init();


exports.getEvents = async function (req, res) {
  const events = await dbEvents.getAllEvents();

  const eventsWithOwner = [];
  events.map((event) => {
    if (event.createdBy === req.session.user?.username || req.session.user?.role === "manager") {
      event.isOwner = true;
    } else {
      event.isOwner = false;
    }
    eventsWithOwner.push(event);
  });

  console.log(eventsWithOwner);


  res.render("events", { title: "Events", events: eventsWithOwner, user: req.session.user });
};

exports.getEvent = async function (req, res) {
  const id = req.params.id;
  const event = await dbEvents.getEvent(id);
  res.render("event", { title: "Event", event: event });
};

exports.getNewEvent = function (req, res) {
  res.render("newEvent", { title: "New Event" });
};

exports.postNewEvent = async function (req, res) {
  const newEvent = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time_start: req.body.time_start,
    time_end: req.body.time_end,
    available_tickets: req.body.available_tickets,
    location: req.body.location,
    category: req.body.category,
    image: req.body.image,
    guests: 0,
    createdBy: req.session.user?.username,
  };

  await dbEvents.addEvent(newEvent);
  res.redirect("/events");
};

exports.getEditEvent = async function (req, res) {
  const id = req.params.id;
  const event = await dbEvents.getEvent(id);
  res.render("editEvent", { title: "Edit Event", event: event });
};

exports.putEditEvent = async function (req, res) {
  const id = req.params.id;
  const event = await dbEvents.getEvent(id);
  event.title = req.body.title;
  event.description = req.body.description;
  event.date = req.body.date;
  event.time_start = req.body.time_start;
  event.time_end = req.body.time_end;
  event.available_tickets = req.body.available_tickets;
  event.location = req.body.location;
  event.image = req.body.image;
  event.category = req.body.category;
  await db.updateEvent(id, event);
  res.redirect("/events");
};

exports.deleteEvent = async function (req, res) {
  const id = req.params.id;
  await dbEvents.deleteEvent(id);
  res.redirect("/events");
};

