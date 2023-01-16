module.exports= (sequelize, dataTypes) => {
    let alias = "Product";
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
        tableName: 'products',
        timestamps: false
    };
    
    
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Categoria, {
            as: "categorias",
            foreignKey: "category_id"
        })
 }
    return Servicio
}