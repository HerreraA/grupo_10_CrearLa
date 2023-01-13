const fs = require('fs');
const path = require('path'); 
const { use } = require('../routes/products');
let db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {
    login: (req, res) => {
        res.render('./users/login.ejs')
    },

    register: (req, res) => {
        res.render('./users/register.ejs')
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

    }
}

module.exports = usersController;