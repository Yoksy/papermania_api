const userModel = require("../model/User");

exports.getAllUsers = (req, res) => {
  userModel.find({}, (err, resp) => {
    console.log('GET::getAllUsers', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(200).json(resp);
  });
};

exports.getUserByUsername = (req, res) => {
  userModel.find({ username: req.params.username }, '-__v', (err, resp) => {
    console.log('GET::getUser', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(200).json(resp);
  });
};

exports.createUser = (req, res) => {
  const newUser = new userModel(req.body);

  newUser.save((err, resp) => {
    console.log('POST::createItem', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(201).json(resp);
  });
};

exports.updateUserByUsername = (req, res) => {
  userModel.findOneAndUpdate(
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
  userModel.remove({ username: req.params.username }, (err) => {
    console.log('DELETE::deleteUser', err && err.message || '')
    if (err) res.status(404).send(err);

    res.status(200).json({ message: "User successfully removed" });
  });
};
