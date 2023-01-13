const fs = require('fs');
const path = require('path'); 
const { use } = require('../routes/products');
const User = require('../models/User');
const bcryptjs = require ('bcryptjs');
const { validationResult } = require('express-validator');
let db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {
    register: (req, res) => {
        res.render('./users/register')
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
            imagen: req.file.filename
        }

        let userCreated = User.create(userToCreate);

        return res.redirect('/users/login');
    },
    login: (req, res) => {
        return res.render('./users/login.ejs')
    },
    loginProcess: (req, res) => {
        return res.send(req.body);
    },
    profile: (req, res) => {
        return res.render('userProfile')
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