
const mainController = {
    home: (req, res) => {
        res.render('./home/home')
    },
    contact: (req, res) => {
        res.render ('contact')
    },
    portfolio: (req, res) => {
        res.render ('./portfolio/portfolio')
    },
    carrito: (req, res) => {
        res.render('carrito.ejs')
    },
    nosotros: (req, res) => {
        res.render('./products/nosotros')
    },
}

module.exports = mainController; 