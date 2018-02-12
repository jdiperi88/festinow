const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');


/* after a user is saved from google stratgey in to mongoDB, it gets passed to this func
which will serialize this user by its id taken from the mongoDB and store in cookies  */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/* this func deserializes the user once provided the id which we gained from the above serialize func and turn user id into a user. Response is the user object from the mongoDB */
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// Google OAuth Strategy Logic and saving users in mongoDB
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        async (accessToken, refreshToken, profile, done) => {
            
            // query mongoDB first to see if this user exist in the DB
            const existingUser = await User.findOne({ googleId: profile.id })

            // if user already in mongoDB then simply return the existingUser
            if (existingUser) { return done(null, existingUser) };

            // else create a new user and save it to mongoDB and return the user
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
    )
);

