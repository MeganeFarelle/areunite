const usersDAO = require("./models/usersModel");
const eventsDAO = require("./models/eventsModel");

const dbUsers = new usersDAO("users.db");
const dbEvents = new eventsDAO("events.db");

module.exports = {
    dbUsers,
    dbEvents
};