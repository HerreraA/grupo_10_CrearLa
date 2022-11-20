const fs = require('fs');
const path = require('path');  

const productsFilePath = path.join(__dirname, '../data/product.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {

    //* Enseña la cantidad de productos disponibles */

    index: (req, res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('./products/product.ejs', {products})
    }, 

    carrito: (req, res) => {
        res.render('carrito.ejs')
    },

    desarrolloApp: (req, res) => {
        res.render ('./products/desarrollo-app.ejs')
    },

    desarrolloSoftware: (req, res) => {
        res.render('./products/desarrollo-software.ejs')
    },

    desarrolloWeb: (req, res) => {
        res.render('./products/desarrollo-web.ejs')
    },

    disenoWeb: (req, res) => {
        res.render('./products/diseno-web.ejs')
    },

    ecommerce: (req, res) => {
        res.render('./products/ecommerce.ejs')
    }

}

module.exports = productsController ;
