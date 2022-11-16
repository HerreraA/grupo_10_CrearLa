
const productsController = {
    index: (req, res) => {
        res.render ('./products/product.ejs')
    },

    desarrolloApp: (req, res) => {
        res.render ('./products/desarrollo-app/desarrollo-app.ejs')
    },

    desarrolloSoftware: (req, res) => {
        res.render('./products/desarrollo-software/desarrollo-software.ejs')
    },

    desarrolloWeb: (req, res) => {
        res.render('./products/desarrollo-web/desarrollo-web.ejs')
    },

    disenoWeb: (req, res) => {
        res.render('./products/diseno-web/diseno-web.ejs')
    },

    ecommerce: (req, res) => {
        res.render('./products/ecommerce/ecommerce.ejs')
    }
}

module.exports = productsController ;
