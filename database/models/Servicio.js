module.exports= (sequelize, dataTypes) => {
    let alias = "Servicios";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: dataTypes.STRING,
        },
        descripcion:{
            type: dataTypes.STRING,
        },
        precio: {
            type: dataTypes.INTEGER
        },
        imagen:{
            type: dataTypes.STRING,
        }

    };
    let config = {
        tableName: 'servicios',
        timestamps: false
    };
    
    
    const Servicio = sequelize.define(alias, cols, config);

    Servicio.associate = function (models) {
        Product.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey: "categoria_id"
        })
 }
    return Servicio
}