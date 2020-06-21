const passport = require('passport');
const gravatar = require('gravatar');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');

const User = require('./models/User');

const {
  facebookClientId,
  facebookClientSecret,
  jwtSecret
} = require('./config');

// JSON WEB TOKEN STRATEGY
passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: jwtSecret
    },
    async (payload, done) => {
      try {
        // Find user specified in token
        const user = await User.findById(payload.user.id);
        // If user not exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        // done(null, user.local);
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email'
      // session: false,
    },
    async (email, password, done) => {
      try {
        // Find the user with given email
        const user = await User.findOne({ 'local.email': email });

        // If not, handle it
        if (!user) {
          return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
          return done(null, false);
        }

        // Otherwise return the user
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  'facebooktoken',
  new FacebookTokenStrategy(
    {
      clientID: facebookClientId,
      clientSecret: facebookClientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('profile: ', profile);
        const email = profile.emails[0].value;
        let existingUser = await User.findOne({ 'facebook.id': profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Check if we have someone with same email
        existingUser = await User.findOne({
          'local.email': email
        });
        if (existingUser) {
          // merge facebook's data with local auth
          existingUser.facebook = {
            id: profile.id,
            email: email
          };

          await existingUser.save();
          return done(null, existingUser);
        }

        // Get user gravatar
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        const newUser = new User({
          method: 'facebook',
          name: profile._json.name,
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
            avatar
          }
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        done(err, false, err.message);
      }
    }
  )
);
