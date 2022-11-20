
const usersController = {
    login: (req, res) => {
        res.render('./users/login.ejs')
    },

    register: (req, res) => {
        res.render('./users/register.ejs')
    },

    processRegister: (req, res) => {
        return res.send ({
            body: req.body,
            file: req.file})
    }
}

module.exports = usersController;