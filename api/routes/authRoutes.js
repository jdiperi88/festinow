const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    )

    app.get('/auth/google/callback', passport.authenticate('google'));

    // logout() is being gained from passport library
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(`User is ${req.user}. Log out success!!`)
    });

    // for test purposes only. 
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}