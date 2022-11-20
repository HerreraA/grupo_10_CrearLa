
const mainController = {
    home: (req, res) => {
        res.render('home.ejs')
    },

    contact: (req, res) => {
        res.render ('contact.ejs')
    },

    portfolio: (req, res) => {
        res.render ('portafolio.ejs')
    }

}

module.exports = mainController; 