const app = require('express')();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

require('dotenv').config();
require('./config/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const itemCtrl = require("./controller/Item");
const userCtrl = require("./controller/User");
const categoryCtrl = require("./controller/Category");

app.route("/items")
  .get(itemCtrl.getAllItems)
  .post(itemCtrl.createItem);

app.route("/items/:itemid")
  .get(itemCtrl.getItemById)
  .put(itemCtrl.updateItemById)
  .delete(itemCtrl.deleteItemById);

app.route("/users")
  .get(userCtrl.getAllUsers)
  .post(userCtrl.createUser);

app.route("/users/:username")
  .get(userCtrl.getUserByUsername)
  .put(userCtrl.updateUserByUsername)
  .delete(userCtrl.deleteUserByUsername);

app.route("/categories").get(categoryCtrl.getAllCategories);
app.route("/categories/:categoryid").get(categoryCtrl.getCategoryBySlug);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
