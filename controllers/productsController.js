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
    },
    create: (req, res)=>{
        res.render("products/portafolio.ejs")
    },
    store: (req, res)=>{
        // guardamos el producto//
        let newProduct = {
            id: products[products.length - 1].id + 1,
			nombre: req.body.nombre,
			descripcion: req.body.description,
			categoria: req.body.categoria,
			imagen: req.file.filename,
			precio: req.body.precio
		}
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, "  "));
		res.redirect("/products")
    },
    

}

module.exports = productsController ;
