const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, "../data/product.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/*const productsController = {
    index: function (req, res) {
        let htmlPath = path.resolve (__dirname, '../views/products')
        res.sendFile (htmlPath)
        
    }
}*/


const productsController = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic
	}
};


module.exports = productsController ;
