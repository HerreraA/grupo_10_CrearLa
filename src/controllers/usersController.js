const path = require('path');
const { use } = require('../routes/servicios');

const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
let db = require('../database/models');
//const Usuario = require ('../database/models/Usuario.js')

// Defino variable para base de datos
//let categorias = db.Categoria.findAll()


const usersController = {

  
   login: (req, res) => {
      let categorias = db.Categoria.findAll()
          .then(function(categorias){
      return res.render('users/login', {categorias})
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
            return res.render('/users/login', {
               errors:
               {email: {
                     msg: 'Las Credenciales son Invalidas'}
               },
               categorias
            })
         }
      } else {
         if (!req.body.email) {
            return res.render('/users/login', {
               errors:
               {
                  email: {
                     msg: "El Email es Obligatorio."
                  }
               },
               categorias
            })
         } else {
            return res.render('/users/login', {
               errors:
               {
                  email: {
                     msg: 'No se encuentra este email en nuestra base de datos'
                  }
               },
               categorias
            })
         }
      }
   },
   register: (req, res) => {
      let categorias = db.Categoria.findAll()
            .then(function(categorias){
        return res.render('users/register', {categorias})
    })

    },
      
      
   
    profile: (req, res) => {
      let categorias = db.Categoria.findAll()
      return res.render('users/profile', {
         user: req.session.userLogged, categorias
      })

   },
   logout: (req, res) => {
      let categorias = db.Categoria.findAll()
     res.clearCookie("userEmail")
      req.session.destroy();
      res.locals.isLogged = false
      res.locals.userLogged = undefined
 
      return res.redirect("..")
   },
   
   
   
   
    //************************************ INICIO DE CODIGO A VERIFICAR
    processRegister: async (req, res) => {
      let categorias = db.Categoria.findAll()
      const resultValidation = validationResult(req)
         if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
     
               errors: resultValidation.mapped(),
               oldData: req.body,
               categorias
            })
         } else {
            categorias
            // Se crea el usuario nuevo
            const encrypted = bcryptjs.hashSync(req.body.password, 10)
            const newUser = {
               nombre: req.body.nombre,
               fechaDeNacimiento: req.body.fechaDeNacimiento,
               domicilio: req.body.domicilio,
               email: req.body.email,
               password: encrypted,
               foto: req.file?  req.file.foto:'/images/users/defaultFoto.png'
            }
            // Se incluye el usuario nuevo al array de usuarios y se reescribe el archivo JSON con nueva lista
            try {
               await db.Usuarios.create(newUser)
            }
            catch (error) {
               console.error(error)
            }
   
            // Se redirige el cliente a login para que pueda ingresar
            res.redirect("/users/login")
   
   
    }
   }

}


module.exports = usersController;

