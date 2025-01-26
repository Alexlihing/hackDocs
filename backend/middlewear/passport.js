//insert passport logic here

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/user"); // Import User model

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1036957754064-41qv8lmvlc6ke8sv28eu47v05hnq1jcq.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: `http://localhost:3011/api/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let existingUser = await User.findOne({ googleId: profile.id });

        if (!existingUser) {
          // If user does not exist, create a new user
          const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });

          await newUser.save();
          return done(null, newUser);
        } else {
          return done(null, existingUser);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id); //stores user information in a session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Retrieve user from the database
    done(null, user); // Pass the user to the done function (no error)
  } catch (err) {
    done(err, null); // Pass the error to the done function (no user)
  }
});
