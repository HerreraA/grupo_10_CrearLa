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
        awards: {
            type: dataTypes.INTEGER
        }

    };
    let config = {
        tableName: 'servicios',
        timestamps: false
    };
    
    
    const Servicio = sequelize.define(alias, cols, config);
    return Servicio
}