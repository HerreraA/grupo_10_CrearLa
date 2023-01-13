const fs = require('fs');
const path = require('path');  
let db = require('../database/models');
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
 
// Defino variable para base Json de Categorías
const categoryFilePath = path.join(__dirname, '../data/categories.json');
let categories = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));

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
            db.Servicios.create({
                nombre: req.body.nombre,
                categoria: req.body.categoria,
                descripcion: req.body.description,
                precio:req.body.precio
            })
            res.redirect('/products')

    },
    detail: (req, res) => {
        const id = req.params.id;
        const productos = products.find(product => product.id == id);
        //const nombre = products.find(product => product.id == id);
         res.render('products/productSolo', {productos:productos})
     },
    edit: (req, res) => {
        const id = req.params.id;
        const productos = products.find(product => product.id == id);
         res.render('products/productEditForm', {productos})
     },
     update: (req, res)=> {
        //editamos el producto/heroe que lelgo por params.id
        const id = req.params.id;
        const productToEdit = products.find(product => product.id == id);

        const editProduct = {
            id: id,
            nombre: req.body.nombre,
            descripcion: req.body.description,
            categoria: req.body.categoria,
			imagen: req.file ? req.file.filename : productToEdit.imagen,
			precio: req.body.precio
        }
        //ya modificamos el array
        products.forEach((product, index) => {
			if(product.id == id) {
				products[index] = editProduct;
			}
		});
        //** lo gaurdamos */
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		
		res.redirect("/products")
    },
    destroy: (req, res)=>{
        //eliminamos el prodcuto que llego por params.id
        const id = req.params.id;
        const finalProducts = products.filter(product => product.id != id); // que me traiga todos menos al que pusimos en id
          //** lo gaurdamos */
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, " "));
		
		res.redirect("/products")
    }
}

module.exports = productsController ;
