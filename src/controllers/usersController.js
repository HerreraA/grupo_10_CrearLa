const fs = require('fs');
const path = require('path'); 
//const { use } = require('../routes/servicios');
//const User = require('../models/userJson');
const bcryptjs = require ('bcryptjs');
const { validationResult } = require('express-validator');
let db = require('../database/models');
//const Usuario = require ('../database/models/Usuario.js')
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

    loginProcess:  async (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
           res.render('./users/login', {
              errors: resultValidation.mapped(),
              oldData: req.body
           })
        } else {
  
           const user = await db.Usuarios.findOne({
              where: {
                 email: req.body.email
              }
           })
           delete(user.dataValues.password)
           req.session.userLogged = user.dataValues
  
           req.body.recordar ? res.cookie("userLogged", user.dataValues.mail, { maxAge: 1000 * 60 * 5 }) : null // Cookie se guarda por 5 min
  
           res.redirect("/user/profile")
        }
     },
  

    profile: (req, res) => {
        console.log(req.cookies.emailUsuario)
        return res.render('./users/profile', {
            user: req.session.userLogged
        })
        

    },
    logout: (req, res) => {
        res.clearCookie("emailUsuario")
        req.session.destroy();
        return res.redirect("/")
    },
    
    register:  async (req, res) => {
        let categorias = await db.Categoria.findAll()
        res.render('./users/register', {categorias: categorias}) 
        // archivo de registro?//
    },

    //* Se guarda el registro */
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
              direccion: req.body.direccion,
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
           res.redirect("/user/login")
        }
     },
  
 }
    


module.exports = usersController;