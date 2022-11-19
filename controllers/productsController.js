const fs = require("fs");
const path= require("path")

const productosFilePath = path.join(__dirname, "../data/product.json")
let productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"))

const productsController = {
    index: (req, res) => {
        productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"))
        res.render ('products', {products: products})
    },

    create: (req, res)=>{
        res.render("products/productsFormCreate")
    },
    store: (req, res)=>{
        // guardamos el producto//
        let newProduct = {
            id: heroes[productos.length - 1].id + 1,
			nombre: req.body.name,
			descripcion: req.body.description,
			categoria: req.body.category,
			img: req.file.filename,
			precio: req.body.price
		}
		productos.push(newProduct);
		fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, "  "));
		res.redirect("/products")
    },

}

module.exports = productsController ;
