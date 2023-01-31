const Usuario = require("../database/models/Usuario")


async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

   let emailInCookie = req.cookies.userEmail;
   console.log();
   if(req.cookies.userEmail){
       let userFromCookie = await db.Usuario.findOne({where:{ email: emailInCookie}})
       if(userFromCookie){
          req.session.userLogged = userFromCookie
       }

   }

    if (req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }
  
    next()
}
    
    
module.exports = userLoggedMiddleware;