const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  userId: Number,
  username: { type: String, required: true, index: { unique: true } },
  email : { type: String, require: true, index: { unique: true } },
  display_name: String,
  password: { type: String, required: true },
  avatar: String,
  item_ids: Array,
  tutorial_ids: Array,
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

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId' });

module.exports = mongoose.model('User', UserSchema);
