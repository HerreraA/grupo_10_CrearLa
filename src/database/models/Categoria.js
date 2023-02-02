//const { DataTypes } = require("sequelize");

//const { config } = require("process")

module.exports= (sequelize, dataTypes) => {
    let alias = "Categoria";
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
        foto:{
            type: dataTypes.STRING,
        }
    };
    let config = {
        tableName: 'categorias',
        timestamps: false
    };
    
    
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function (models) {
        Categoria.hasMany(models.Servicios, {
            as: "servicios",
            foreignKey: "category_id"
        })
       
    }
    return Categoria
}