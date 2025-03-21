const mongodb = require("mongodb");
require("dotenv").config();

const MongoClient = mongodb.MongoClient;
const { MONGO_URI } = process.env;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URI)
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "No databese found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
