const itemModel = require("../model/Item");



exports.getAllItems = (req, res) => {
  itemModel.find({}, (err, resp) => {
    console.log('GET::getAllItems', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(200).json(resp);
  });
};

exports.getItemById = (req, res) => {
  itemModel.findById(req.params.itemid, (err, resp) => {
    console.log('GET::getItem', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(200).json(resp);
  });
};

exports.createItem = (req, res) => {
  const newItem = new itemModel(req.body);

  newItem.save((err, resp) => {
    console.log('POST::createItem', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(201).json(resp);
  });
};

exports.updateItemById = (req, res) => {
  itemModel.findOneAndUpdate(
    { _id: req.params.itemid },
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
  itemModel.remove({ _id: req.params.itemid }, (err) => {
    console.log('DELETE::deleteItem', err && err.message || '')
    if (err) res.status(404).send(err);

    res.status(200).json({ message: "Item successfully removed" });
  });
};
