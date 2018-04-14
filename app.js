const app = require('express')();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

require('dotenv').config();
require('./config/db');

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);



const itemCtrl = require("./controller/Item");
const userCtrl = require("./controller/User");
const tagCtrl = require("./controller/Tag");
const commentCtrl = require("./controller/Comment");

app.route("/items")
  .get(itemCtrl.getAllItems)
  .post(itemCtrl.createItem);

app.route("/items/:category")
  .get(itemCtrl.getItemsByCategory);

app.route("/item/:itemId")
  .get(itemCtrl.getItemById)
  .put(itemCtrl.updateItemById)
  .delete(itemCtrl.deleteItemById);

app.route("/item/:itemId/comments")
  .post(commentCtrl.createComment);

app.route("/users")
  .get(userCtrl.getAllUsers)
  .post(userCtrl.createUser);

app.route("/users/:username")
  .get(userCtrl.getUserByUsername)
  .put(userCtrl.updateUserByUsername)
  .delete(userCtrl.deleteUserByUsername);

app.route("/tags")
  .get(tagCtrl.getAllTags)
  .post(tagCtrl.createTag);

app.route("/tags/:slug")
  .get(tagCtrl.getTagBySlug);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
