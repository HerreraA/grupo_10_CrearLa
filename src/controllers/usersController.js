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
        res.render('./users/register', {categories})
    },

    //* Se guarda el registro */
    processRegister: (req, res) => {
        db.Usuarios.create({
            nombre: req.body.nombre,
            fechaDeNacimiento:req.body.fechaDeNacimiento,
            domicilio:req.body.domicilio,
            email:req.body.email,
            usuario:req.body.usuario,
            password: req.body.password
        })

        res.redirect('/')
        
    },
    login: (req, res) => {
        return res.render('./users/login.ejs', {categories})
    },
    loginProcess: (req, res) => {
        return res.send(req.body);
    }
}

module.exports = usersController;