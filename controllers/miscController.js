const modelsDAO = require("../models/eventsModel");
const usersDAO = require("../models/usersModel");

const db = new modelsDAO("events.db");
const db2 = new usersDAO("users.db");

exports.getDashboard = async function (req, res) {
    const events = await db.getAllEvents();
    const users = await db2.getAllUsers();
 
    console.log(users);
    res.render("dashboard", { events: req.session.user?.role === 'manager' ? events : events.filter((event) => event.createdBy === req.session.user?.username), isManager: req.session.user?.role === 'manager', users: users});
    };