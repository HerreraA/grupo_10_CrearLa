const fs = require('fs');
const path = require('path');  
let db = require('../database/models');
const { validationResult } = require('express-validator');

// defino variables de base de datos

let categorias = db.Categoria.findAll()
let servicios = db.Servicios.findAll()

const mainController = {
    home: (req, res) => {
       categorias
            .then(function(categorias){
                return  res.render('./home/home', {categorias})
            })
        
    },

    contact: (req, res) => {
        categorias
            .then(function(categorias){
        res.render ('./contact/contact', {categorias})
        })
    },

    contactProcess: (req, res) => {
        categorias
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
            return res.render ('./contact/contact', {
               errors: resultValidation.mapped(),
               oldData: req.body,
               categorias
            })
        } else {
            return res.render ('./contact/contactSend', { categorias })
        }
    },

    portfolio: (req, res) => {
        categorias
            .then(function(categorias){
        res.render ('./portfolio/portfolio', {categorias})
    })
    },

    carrito: (req, res) => {
        categorias
            .then(function(categorias){
        res.render('./carrito/carrito', {categorias})
    })
    },
    
    nosotros: (req, res) => {
        categorias
            .then(function(categorias){
        res.render('./nosotros/nosotros', {categorias, servicios})
    })
    }
}

module.exports = mainController;