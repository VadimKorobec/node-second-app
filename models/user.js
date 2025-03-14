const { ObjectId } = require("mongodb");

const getDb = require("../util/database").getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProduct = this.cart.items.find(
      (item) => item._id === product._id
    );
    const updateCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db.collection("user").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updateCart } }
    );
  }

  static findUserById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = User;
