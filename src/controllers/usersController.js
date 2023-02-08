const path = require('path');
const { use } = require('../routes/servicios');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
let db = require('../database/models');
const Usuario = require ('../database/models/Usuario.js')

// Defino variable para base de datos
let categorias = db.Categoria.findAll()


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
   
   
    //************************************ INICIO DE CODIGO A VERIFICAR
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
            usuario: req.body.usuario,
            password: req.body.password,
            foto: req.file.foto
        }
        users.push(newRegister);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        res.redirect('/'); */
        
        //********* VALIDACIONES NUEVO *********/
        let resultValidation = validationResult(req);
        if(errors.isEmpty()) {
            let user = req.body;
            userId = usersModel.create(user);
            res.redirect ('/users/' + userId);
        } else {
            res.render('users/create', {
                errors: errors.array() 
                old: req.body
            });
        }
        
        if(resultValidation.errors.length > 0) {
            return res.render('userRegisterForm', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        
        let userInDB = User.findByField('email', req.body.email);

        if(userInDB) {
            return res.render('./users/register.ejs', {
                errors: {
                    email: {    
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            imagen: req.file.filename
        }

        let userCreated = User.create(userToCreate);

        return res.redirect('/users/login');
    }, FIN DEL CODIGO A VERIFICAR ************************************/
    
    processRegister: async (req, res) => {
      const resultValidation = validationResult(req)
      if (resultValidation.errors.length > 0) {
         res.render('./users/register', {
            errors: resultValidation.mapped(),
            oldData: req.body
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
            foto. req.body.foto
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
    
    login: (req, res) => {
        categorias
            .then(function(categorias){
        return res.render('./users/login.ejs', {categorias})
    })
},
    loginProcess: (req, res) => {
        return res.send(req.body);
    },
}




module.exports = usersController;

