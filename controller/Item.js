const itemModel = require("../model/Item");
const userModel = require("../model/User");

exports.getAllItems = (req, res) => {
  itemModel.find({}, '-__id -updatedAt -medias.gallery -medias.download -__v')
    .populate('author', 'user_id username display_name avatar')
    .exec(function (err, resp) {
      console.log('GET::getAllItems', err && err.message || '')
      if (err) res.status(500).send(err);

      res.status(200).json(resp);
    });
};

exports.getItemsByCategory = (req, res) => {
  itemModel.find({ category: req.params.category }, '-__id -updatedAt -medias.gallery -medias.download -__v')
    .populate('author', 'user_id username display_name avatar')
    .exec(function (err, resp) {
      console.log(`GET::getItemsByCategory:${req.params.category}`, err && err.message || '')
      if (err) res.status(500).send(err);

      res.status(200).json(resp);
    });
};

exports.getItemById = (req, res) => {
  itemModel.find({ item_id: req.params.itemId }, '-__id -__v')
    .populate('author', 'user_id username display_name avatar')
    .exec(function (err, resp) {
      console.log(`GET::getItemById:${req.params.itemId}`, err && err.message || '')
      if (err) res.status(500).send(err);

      res.status(200).json(resp);
    });
};

exports.createItem = (req, res) => {
  const newItem = new itemModel(req.body);

  userModel.find({ username: req.body.username }, '-__v -createdAt -updatedAt -password -email', (err, user) => {
    newItem.author = new userModel(user[0])

    newItem.save((err, resp) => {
      console.log('POST::createItem', err && err.message || '')
      if (err) res.status(500).send(err);

      res.status(201).json(resp);
    });
  })

  /*

  newItem.save((err, resp) => {
    console.log('POST::createItem', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(201).json(resp);
  }); */
};

exports.updateItemById = (req, res) => {
  itemModel.findOneAndUpdate(
    { _id: req.params.itemId },
    req.body,
    { new: true },
    (err, resp) => {
      console.log('PUT::updateItem', err && err.message || '')
      if (err) res.status(500).send(err);

      res.status(200).json(resp);
    }
  );
};

exports.deleteItemById = (req, res) => {
  itemModel.remove({ _id: req.params.itemId }, (err) => {
    console.log('DELETE::deleteItem', err && err.message || '')
    if (err) res.status(404).send(err);

    res.status(200).json({ message: "Item successfully removed" });
  });
};
