module.exports= (sequelize, dataTypes) => {
    let alias = "Servicio";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: dataTypes.STRING,
        },

        categoria:{
            type:dataTypes.STRING,
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
        Servicio.belongsTo(models.Categoria, {
            as: "categorias",
            foreignKey: "category_id"
        })
 }
    return Servicio
}