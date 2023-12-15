const express = require("express");
const eventController = require("../controllers/eventController");
const { isAuthenticated } = require("../middleware");

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/new", isAuthenticated, eventController.getNewEvent);
router.post("/new", isAuthenticated, eventController.postNewEvent);
router.get("/:id", isAuthenticated, eventController.getEvent);
router.delete("/:id", isAuthenticated, eventController.deleteEvent);
router.get("/:id/edit", isAuthenticated, eventController.getEditEvent);
router.put(":id/edit", isAuthenticated, eventController.putEditEvent);


router.use(function (req, res) {
  res.status(404);
  res.type("text/plain");
  res.send("404 Not found.");
});
router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal Server Error.");
});

module.exports = router;
