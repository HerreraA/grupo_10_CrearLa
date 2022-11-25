
const mainController = {
    home: (req, res) => {
        res.render('home.ejs')
    },

    contact: (req, res) => {
        res.render ('contact.ejs')
    },

    portfolio: (req, res) => {
        res.render ('/products/portafolio.ejs')
    },
    carrito: (req, res) => {
        res.render('carrito.ejs')
    },

}

module.exports = mainController; 