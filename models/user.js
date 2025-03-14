const { ObjectId } = require("mongodb");

const getDb = require("../util/database").getDb;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findUserById(userId) {
    const db = getDb();
    return db.collection("users").find({ _id: new ObjectId(userId) }), next();
  }
}
module.exports = User;
