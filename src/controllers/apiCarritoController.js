const db = require('../database/models');

const apiCarritoController = {

    list : async(req, res) =>{
        let response = {
            count: 0,
            countByCategory: {},
            categorias: [], 
        }

        let servicios = await db.Servicios.findAll({include: [ "categorias"]})
        let categorias = await db.Categoria.findAll({include: ["servicios"]})
        categorias.forEach(categoria => response.countByCategory[categoria.nombre] = categoria.id)
        response.count = categorias.length
        response.categorias = categorias.map(categoria => {
            let servicioDetail = {
                id: categoria.id,
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
                foto: categoria.foto,
                asociations: [categoria.servicios.nombre],
                detail: `/api/categorias/${categoria.id}`,
            }
            return servicioDetail
        })
        return res.json(response)
    }
}

module.exports = apiCarritoController;