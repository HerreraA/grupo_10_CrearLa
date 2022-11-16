const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/product.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", { products: products });
  },


};


module.exports = productsController ;
