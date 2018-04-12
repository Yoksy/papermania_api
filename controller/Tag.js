const tagModel = require("../model/Tag");

exports.getAllTags = (req, res) => {
  tagModel.find({}, (err, resp) => {
    console.log('GET::getAllTags', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(200).json(resp);
  });
};

exports.getTagBySlug = (req, res) => {
  tagModel.find({ slug: req.params.slug }, (err, resp) => {
    console.log('GET::getTagBySlug: %s', req.params.slug, err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(200).json(resp);
  });
};

exports.createTag = (req, res) => {
  const newItem = new tagModel(req.body);

  newItem.save((err, resp) => {
    console.log('POST::createTag', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(201).json(resp);
  });
};
