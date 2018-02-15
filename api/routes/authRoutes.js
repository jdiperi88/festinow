const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    )

    //re-routing user after success login with google
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/dash');
        }
    );
    
    app.get(
        '/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['public_profile', 'email']
        })
    );

    app.get(
        '/auth/facebook/callback',
        passport.authenticate('facebook'),
        (req, res) => {
            res.redirect('/dash');
        }
    );


    // logout() is being gained from passport library
    app.get(
        '/api/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    );

    
    app.get(
        '/api/current_user',
        (req, res) => {
            res.send(req.user);
        }
    );
}