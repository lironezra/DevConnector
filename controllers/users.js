const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { jwtSecret } = require('../config');

const signToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user.id
      }
    },
    jwtSecret,
    { expiresIn: 360000 }
  );
};

module.exports = {
  signUp: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // See if user already exists
      let newUser = await User.findOne({ 'local.email': email });

      if (newUser) return res.status(400).json({ msg: 'User already exsits' });

      // Get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      newUser = new User({
        methods: 'local',
        name,
        local: {
          // name,
          email,
          avatar,
          password
        }
      });

      await newUser.save();

      // Sign a token
      const token = signToken(newUser);

      return res.status(200).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  signIn: async (req, res, next) => {
    // Sign a token
    const token = signToken(req.user);

    return res.status(200).json({ token });
  },
  secret: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select({
        'local.password': 0
      });
      res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
    // res.json({ secret: 'resource' });
  },
  facebookOAuth: async (req, res, next) => {
    // Sign a token
    const token = signToken(req.user);

    return res.status(200).json({ token });
  }
};
