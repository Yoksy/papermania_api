const model = require("../model/Category");

exports.getAllCategories = (req, res) => {
  model.find({}, (err, resp) => {
    console.log('GET::getAllCategories', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(200).json(resp);
  });
};

exports.getCategoryBySlug = (req, res) => {
  model.findById(req.params.categoryid, (err, resp) => {
    console.log('GET::getUser', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(200).json(resp);
  });
};
