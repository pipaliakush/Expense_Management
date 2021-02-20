const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  const existedUser = await User.findOne({ email: user.email });

  if (existedUser) {
    done(null, user);
  } else {
    done(new Error("Failed to deserialize an user"));
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.PASSPORT_GOOGLE_AUTH_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
      try {
        const user = await User.findOne({ email: profile._json.email });
        if (!user) {
          const user = new User({
            name: profile._json.name,
            email: profile._json.email,
          });

          const newUser = await user.save();
          if (newUser) {
            const userData = {
              id: newUser.id,
              name: profile._json.name,
              email: profile._json.email,
              avatar: profile._json.picture,
            };
            done(null, userData);
          }
        } else {
          const userData = {
            id: user.id,
            name: profile._json.name,
            email: profile._json.email,
            avatar: profile._json.picture,
          };
          done(null, userData);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
