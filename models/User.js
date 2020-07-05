const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  methods: {
    type: [String],
    enum: ['local', 'facebook'],
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  local: {
    // name: {
    //   type: String
    // },
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: false
    }
  }
});

// UserSchema.pre('save', async function (next) {
//   try {
//     if (!this.methods.includes('local') && !this.isNew) {
//       next();
//     }
//     //Generate a salt
//     const salt = await bcrypt.genSalt(10);

//     // Generate password hash
//     const passwordhash = await bcrypt.hash(this.local.password, salt);

//     this.local.password = passwordhash;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = User = mongoose.model('user', UserSchema);
