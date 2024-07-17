const mongoose = require("mongoose");
require("dotenv").config();
const mongo = process.env.MONGO;

const connection = async () => {
  try {
    mongoose.connect(mongo);
    console.log("The DataBase is connected");
  } catch (error) {
    console.log("Error connecting with data base");
  }
};

module.exports = connection;
