const fs = require('fs');
const path = require('path'); 
//const { use } = require('../routes/servicios');
const User = require('../models/User');
const bcryptjs = require ('bcryptjs');
const { validationResult } = require('express-validator');
let db = require('../database/models');

// Defino variable para base Json de Categorías
//const categoryFilePath = path.join(__dirname, '../data/categories.json');
//let categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));

//const usersFilePath = path.join(__dirname, "../data/users.json");
//  let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {
    login: async (req, res) => {
        let categorias = await db.Categoria.findAll()
        res.render('./users/login', {categorias: categorias}) 
        // archivo de registro?//
    },

    loginProcess: async(req, res) => {
        let userToLogin= await db.Usuario.findOne({where:{email:req.body.email}})

        if (userToLogin){
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordOk){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                return res.redirect("./users/profile") // aca deberia dejarlo ingresar a la aprte de gente logeada
            } else{
            return  res.render('/users/login', {
                errors: {
                    email: {
                        msg: "Las credenciale son invalidas "
                    }
                }
            });
        } } else { 
        return res.render('./users/login', {
            errors: {
                email: {
                    msg: "No se encuentra dicho E-mail en la base de datos"
                }
            } 
        });
   } },
    profile: (req, res) => {
        return res.render('./users/profile', {
            user: req.session.userLogged
        })
        

    },
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect("/")
    },
    
    register:  async (req, res) => {
        let categorias = await db.Categoria.findAll()
        res.render('./users/register', {categorias: categorias}) 
        // archivo de registro?//
    },

    //* Se guarda el registro */
    processRegister: async(req, res) => {
        const errors = validationResult(req);
       if (errors.isEmpty()) {
         let userInDb =  await db.Usuario.findOne({ where: { email:req.body.email } });
         if (userInDb) {
           let categorias = await db.Categoria.findAll()
                   return res.render('users/register', {
                     errors: { 
                       email:{
                       msg: 'Este Email ya esta registrado'} },
                     old: req.body.categorias
                  })
              }
              else{
               db.Usuario.create({
                nombre: req.body.nombre,
                fechaDeNacimiento: req.body.fechaDeNacimiento ,
                domicilio: req.body.domicilio,
                email: req.body.email,
                usuario: req.body.usuario,
                password: bcryptjs.hashSync(req.body.password,10),
                foto: req.file.filename
                       });
                      res.redirect("/")
              }
     
         }
         else{
           
          let categorias = await db.Categoria.findAll()
           res.render('users/register',{categorias:categorias,
                  errors: errors.mapped(),
                  old: req.body
              })
         }
     
       },
 }
    


module.exports = usersController;