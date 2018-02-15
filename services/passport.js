const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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

            const name = `${profile.name.givenName} ${profile.name.familyName}`;
            const email = (profile.emails[0].value || 'n/a').toLowerCase();
            const id = profile.id;
            
            // query mongoDB first to see if this user exist in the DB
            const existingUser = await User.findOne({ 'google.id': profile.id })

            // if user already in mongoDB then simply return the existingUser
            if (existingUser) { return done(null, existingUser) };

            // else create a new user and save it to mongoDB and return the user
            const user = await new User(
                { 
                    'google': { id, email, name }
                }
            )
            .save();
            done(null, user);
        }
    )
);

// Facebook OAuth Strategy Logic

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookClientID,
            clientSecret: keys.facebookClientSecret,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'email', 'first_name', 'last_name'],
        },
        async (accessToken, refreshToken, profile, done) => {
            
            const name = `${profile.name.givenName} ${profile.name.familyName}`;
            const email = (profile.emails[0].value || 'n/a').toLowerCase();
            const id = profile.id;

            // query mongoDB first to see if this user exist in the DB
            const existingUser = await User.findOne({ 'facebook.id': profile.id });
            
            // if user already in mongoDB then simply return the existingUser
            if (existingUser) { return done(null, existingUser) };

            // else create a new user and save it to mongoDB and return the user
            const user = await new User(
                {
                    'facebook': { id, email, name }
                }
            ).save();
            done(null, user);
          }
    )
);

