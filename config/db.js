const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB)
    .then(db => {
      console.log("::Database connection established::", db.connections[0].readyState)
    }, err => {
      console.log("::Error establishing database connection::", err)
    });
