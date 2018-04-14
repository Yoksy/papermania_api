const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

const UserSchema = new Schema({
  user_id: Number,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,/*
    validate:[validator({
        length:{
            min: 3,
            max: 24
        }
    }), "username"], */
  },
  email : {
    type: String,
    require: true,
    unique: true,
    trim: true,
    select: false,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  display_name: {
    type: String,
    trim: true,
  },
  avatar: String,
  account_type: {
    type: String,
    enum: ['admin', 'moderator', 'member'],
    default: 'member',
  },
  location: String,
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
},
{
  timestamps: true
});

UserSchema.pre('save', function(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'user_id' });

module.exports = mongoose.model('User', UserSchema);
