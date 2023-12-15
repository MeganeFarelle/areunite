
const { dbUsers, dbEvents } = require("../ds");

exports.getDashboard = async function (req, res) {
    const events = await dbEvents.getAllEvents();
    const users = await dbUsers.getAllUsers();
 
    console.log(users);
    res.render("dashboard", { events: req.session.user?.role === 'manager' ? events : events.filter((event) => event.createdBy === req.session.user?.username), isManager: req.session.user?.role === 'manager', users: users});
    };