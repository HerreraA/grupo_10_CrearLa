const db = require ("../database/models")

module.exports= {
    all: async (req, res) => {
        let response = {
            count: 0,
            users: []
        }
        let users = await db.Usuarios.findAll()
        response.count = users.length
        response.users = users.map(user => {
            let userDetail = {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                detail: `/api/users/${user.id}`
            }
            return userDetail
        })
        return res.json(response)

    },

    detail: async (req, res) => {
        let user = await db.Usuarios.findByPk(req.params.id)
        let response = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            fechaDeNacimiento: user.fechaDeNacimiento,
            domicilio: user.domicilio,
            usuario: user.usuario,
            foto: `http://localhost:3500${user.foto}`
        }
        return res.json(response)
    },

  
}