const fs = require('fs');
const path = require('path');  


// Defino variable para base Json de Productos (servicios)
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {

    //* Enseña la cantidad de productos disponibles */
    index: (req, res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('./products/product', {products})
    }, 
    desarrolloApp: (req, res) => {
        res.render ('./products/desarrollo-app')
    },
    desarrolloSoftware: (req, res) => {
        res.render('./products/desarrollo-software')
    },
    desarrolloWeb: (req, res) => {
        res.render('./products/desarrollo-web')
    },
    disenoWeb: (req, res) => {
        res.render('./products/diseno-web')
    },
    ecommerce: (req, res) => {
        res.render('./products/ecommerce')
    },
    productCreate: (req, res) => {
        res.render('./products/productCreate')
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
		res.redirect("/product")
    },
}

module.exports = productsController ;
