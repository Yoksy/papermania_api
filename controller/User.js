const model = require("../model/User");

exports.getAllUsers = (req, res) => {
  model.find({}, (err, resp) => {
    console.log('GET::getAllUsers', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(200).json(resp);
  });
};

exports.getUserByUsername = (req, res) => {
  model.find({ username: req.params.username }, '-_id -__v', (err, resp) => {
    console.log('GET::getUser', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(200).json(resp);
  });
};

exports.createUser = (req, res) => {
  const newUser = new model(req.body);

  newUser.save((err, resp) => {
    console.log('POST::createItem', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(201).json(resp);
  });
};

exports.updateUserByUsername = (req, res) => {
  model.findOneAndUpdate(
    { username: req.params.username },
    req.body,
    { new: true },
    (err, resp) => {
      console.log('PUT::updateUser', err && err.message || '')
      if (err) res.status(500).send(err);

      res.status(200).json(resp);
    }
  );
};

exports.deleteUserByUsername = (req, res) => {
  model.remove({ username: req.params.username }, (err) => {
    console.log('DELETE::deleteUser', err && err.message || '')
    if (err) res.status(404).send(err);

    res.status(200).json({ message: "User successfully removed" });
  });
};
