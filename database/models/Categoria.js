//const { DataTypes } = require("sequelize");

//const { config } = require("process")

module.exports= (sequelize, dataTypes) => {
    let alias = "Categorias";
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

    };
    let config = {
        tableName: 'movies',
        timestamps: false
    };
    
    
    const Categoria = sequelize.define(alias, cols, config);
    return Categoria
}