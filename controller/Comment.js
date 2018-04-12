const commentModel = require("../model/Comment");
const itemModel = require('../model/Item');
const userModel = require('../model/User');
const strftime = require('strftime');

const generateSlug = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

exports.createComment = (req, res) => {
  const itemId = req.params.itemId;
  const username = req.body.author;
  const content = req.body.content;

  const slug = generateSlug();
  const full_slug = strftime('%F-%T', new Date()) + ':' + slug;

  userModel.find({ username })
    .then((user) => {
      const newComment = new commentModel({
        item_id: itemId,
        author: user[0]._id,
        authorName: user[0].display_name,
        authorAvatar: user[0].avatar,
        content,
        slug,
        full_slug
      })

      newComment.save((err, resp) => {
        console.log('POST::createComment', err && err.message || '')
        if (err) res.status(500).send(err);

        res.status(201).json(resp);
      });

    })

  /* itemModel.findById(itemId)
    .then((item) => {
      userModel.find({ username: req.body.author })
        .then((author) => {
          const authorId = author._id;
          const comment = new commentModel({ itemId, author: authorId, content })

          item.comments.unshift(comment);

          item.save((err, resp) => {
            console.log('POST::createComment', err && err.message || '')
            if (err) res.status(500).send(err);

            res.status(201).json(resp);
          });
        })
    }) */


  /* let body = {...req.body}

  const slug = generateSlug();
  const full_slug = strftime('%F-%T', new Date()) + ':' + slug;

  console.log(slug, full_slug)

  body.slug = slug;
  body.full_slug = full_slug;

  if (body.parent_slug) {
    body.slug = body.parent_slug + '/' + slug;
    body.full_slug = body.parent_slug + '/' + full_slug;
  }

  const newItem = new commentModel(body);

  newItem.save((err, resp) => {
    console.log('POST::createComment', err && err.message || '')
    if (err) res.status(500).send(err);

    res.status(201).json(resp);
  }); */
};
