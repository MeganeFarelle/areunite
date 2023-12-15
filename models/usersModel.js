const nedb = require("gray-nedb");

class UsersModel {
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
      username: "user",
      password: "pass",
      email: "test@gamil.com",
        role: "user",
    });
  }

    getAllUsers() {
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

    getUser(email) {
        return new Promise((resolve, reject) => {
        this.db.findOne({ email: email }, function (err, docs) {
            if (err) {
            reject(err);
            } else {
            resolve(docs);
            }
        });
        });
    }

    addUser(user) {
        return new Promise((resolve, reject) => {
        this.db.insert(user, function (err, newDoc) {
            if (err) {
            reject(err);
            } else {
            resolve(newDoc);
            }
        });
        });
    }

    deleteUser(id) {
        return new Promise((resolve, reject) => {
        this.db.remove({ _id: id }, function (err, numRemoved) {
            if (err) {
            reject(err);
            } else {
            resolve(numRemoved);
            }
        });
        });
    }

    updateUser(username, user) {
        return new Promise((resolve, reject) => {
        this.db.update({ username: username }, user, {}, function (
            err,
            numReplaced
        ) {
            if (err) {
            reject(err);
            } else {
            resolve(numReplaced);
            }
        });
        });
    }

}

module.exports = UsersModel;