const fs = require('fs');
const path = require('path'); 
const { use } = require('../routes/servicios');
const User = require('../models/User');
const bcryptjs = require ('bcryptjs');
const { validationResult } = require('express-validator');
let db = require('../database/models');

// Defino variable para base Json de Categorías
const categoryFilePath = path.join(__dirname, '../data/categories.json');
let categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {
    register: (req, res) => {
        res.render('./users/register') // archivo de registro?//
    },

    //* Se guarda el registro */
    processRegister: (req, res) => {
        /* let newRegister = {
            id: users[users.length - 1].id + 1  ,
            nombre: req.body.nombre,
            fechaDeNacimiento: req.body.fechaDeNacimiento ,
            domicilio: req.body.domicilio ,
            email: req.body.email,
            usuario: req.body.usuario,
            password: req.body.password,
            foto: req.file.foto
        }
        users.push(newRegister);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        res.redirect('/'); */
        const resultValidation = validationResult(req);
        
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
            foto: req.file.filename
        }

        let userCreated = User.create(userToCreate);

        return res.redirect('./users/login');
    },
    login: (req, res) => {
        return res.render('login.ejs')  
    },

    loginProcess: (req, res) => {
        let userToLogin= User.findByField("email", req.body.email);

        if (userToLogin){
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordOk){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                return res.redirect("./users/profile") // aca deberia dejarlo ingresar a la aprte de gente logeada
            }
            return  res.render('/users/login', {
                errors: {
                    email: {
                        msg: "Las credenciale son invalidas "
                    }
                }
            });
        }  
        return res.render('./users/login', {
            errors: {
                email: {
                    msg: "No se encuentra dicho E-mail en la base de datos"
                }
            }
        });
    },
    profile: (req, res) => {
        return res.render('userProfile', {
            user: req.session.userLogged
        })
        db.Usuarios.create({
            nombre: req.body.nombre,
            fechaDeNacimiento:req.body.fechaDeNacimiento,
            domicilio:req.body.domicilio,
            email:req.body.email,
            usuario:req.body.usuario,
            password: req.body.password
        })

        res.redirect('/')

    }
}

module.exports = usersController;