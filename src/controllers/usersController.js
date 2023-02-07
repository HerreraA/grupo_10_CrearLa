const fs = require('fs');
const path = require('path');
//const { use } = require('../routes/servicios');
//const User = require('../models/userJson');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
let db = require('../database/models');

//const Usuario = require ('../database/models/Usuario.js')




// Defino variable para base de datos
let categorias = db.Categoria.findAll()


//const usersFilePath = path.join(__dirname, "../data/users.json");
//  let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {

  
       login: (req, res) => {
         let categorias = db.Categoria.findAll()

            .then(function(categorias){
        return res.render('/users/login.ejs', {categorias})
    })
},
async loginProcess(req, res) {
   let categorias = db.Categoria.findAll()
      let userALoguear = await db.Usuarios.findOne({ where: { email: req.body.email } });
      if (userALoguear) {
         let contraseñaCorrecta = bcryptjs.compareSync(req.body.password, userALoguear.password);
         if (contraseñaCorrecta) {
            req.session.userLogged = userALoguear;

            if (req.body.recordarUsuario) {
               res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 2 })

            }
            res.redirect('/users/profile');
         } else {
            return res.render('users/login', {
               errors:
               {
                  email: {
                     msg: 'Las Credenciales son Invalidas'
                  }
               }
            })
         }
      } else {
         if (!req.body.email) {
            return res.render('users/login', {
               errors:
               {
                  email: {
                     msg: "El Email es Obligatorio."
                  }
               }
            })
         } else {
            return res.render('users/login', {
               errors:
               {
                  email: {
                     msg: 'No se encuentra este email en nuestra base de datos'
                  }
               }
            })
         }
      }
   },


    register: (req, res) => {
      let categorias = db.Categoria.findAll()
            .then(function(categorias){
        res.render('/users/register', {categorias})
    })

    },
      
   
    profile: (req, res) => {
      let categorias = db.Categoria.findAll()
      return res.render('/users/profile', {
         user: req.session.userLogged, categorias
      })

   },
   logout: (req, res) => {
      let categorias = db.Categoria.findAll()
     res.clearCookie("emailUsuario")
      req.session.destroy();
      res.locals.isLogged = false
      
      return res.redirect("..")
   },
   
   
    processRegister: async (req, res) => {
      let categorias = db.Categoria.findAll()
      const resultValidation = validationResult(req)
      if (resultValidation.errors.length > 0) {
         res.render('/users/register', {
            errors: resultValidation.mapped(),
            oldData: req.body,
            categorias
         })
      } else {
         // Se crea el usuario nuevo
         const encrypted = bcryptjs.hashSync(req.body.password, 10)

         const newUser = {
            nombre: req.body.nombre,
            fechaDeNacimiento: req.body.fechaDeNacimiento,
            domicilio: req.body.domicilio,
            email: req.body.email,
            password: encrypted,

         }
         // Se incluye el usuario nuevo al array de usuarios y se reescribe el archivo JSON con nueva lista
         try {
            await db.Usuarios.create(newUser)
         }
         catch (error) {
            console.error(error)
         }

         // Se redirige el cliente a login para que pueda ingresar
         res.redirect("/users/login", {categorias: categorias})
      }
      
   },
}


    



module.exports = usersController;

