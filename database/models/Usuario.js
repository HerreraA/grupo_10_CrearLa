module.exports= (sequelize, dataTypes) => {
    let alias = "Usuarios";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: dataTypes.STRING,
        },
        fechaDeNacimiento:{
            type: dataTypes.DATE,
        },
        domicilio: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        usuario: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        }

    };
    let config = {
        tableName: 'usuarios',
        timestamps: false
    };
    
    
    const Usuario = sequelize.define(alias, cols, config);
    return Usuario
}