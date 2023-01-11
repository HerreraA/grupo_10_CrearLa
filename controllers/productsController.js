const fs = require('fs');
const path = require('path');  

const productsFilePath = path.join(__dirname, '../data/product.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
 

const productsController = {


}

module.exports = productsController ;
