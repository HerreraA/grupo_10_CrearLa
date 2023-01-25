function userLoggedMiddleware(req, res, next) {

    res.locals.isLogged = false;
    if (req.session && req.session.userLogger){
        res.locals.isLogged = true;
    }
    next()
}

module.exports = userLoggedMiddleware;