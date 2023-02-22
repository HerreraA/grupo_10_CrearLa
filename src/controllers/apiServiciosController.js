const db = require('../database/models')

module.exports = {
    all: async (req, res) => {
        let response = {
            count: 0,
            countByCategory: {},
            servicios: [], 
        }
        let servicios = await db.Servicios.findAll({include: [ "categorias"]})
        let categorias = await db.Categoria.findAll({include: ["servicios"]})
        categorias.forEach(categoria => response.countByCategory[categoria.nombre] = categoria.servicios.length)
        response.count = servicios.length
        response.servicios = servicios.map(servicio => {
            let servicioDetail = {
                id: servicio.id,
                nombre: servicio.nombre,
                descripcion: servicio.descripcion,
                foto: `http://localhost:3500/servicios${servicio.foto}`,
                asociations: [servicio.categorias.nombre],
                detail: `/api/servicios/${servicio.id}`,
            }
            return servicioDetail
        })
        return res.json(response)
    },
    detail: async (req, res) => {
        let servicio = await db.Servicios.findByPk(req.params.id, {include: ["categorias"]})
        let response = {
            id: servicio.id,
            nombre: servicio.nombre, 
            descripcion: servicio.descripcion,
            foto: `http://localhost:3500/${servicio.foto}`,
            precio: servicio.precio,
            
            asociations: [servicio.categorias],
          
        }
        return res.json(response)
    }
}