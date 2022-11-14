const path = require('path');

const productsController = {
    index: function (req, res) {
        let htmlPath = path.resolve (__dirname, '../views/products')
        res.sendFile (htmlPath)
        
    }
}

module.exports = controller;
