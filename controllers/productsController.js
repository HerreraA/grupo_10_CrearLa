
const productsController = {
    index: (req, res) => {
        res.render ('./products/product.ejs')
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
