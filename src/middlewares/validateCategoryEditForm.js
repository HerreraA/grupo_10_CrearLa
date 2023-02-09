
const { body } = require('express-validator')
const path = require('path')

module.exports = [
    body('nombre')
        .notEmpty().withMessage('Debes ingresar el nombre de la categoría').bail()
        .isLength({ min: 5 }).withMessage('El nombre de la categoría debe tener, al menos, 5 caracteres'),
    body('description')
        .notEmpty().withMessage('Debes ingresar la descripción de la categoría').bail()
        .isLength({ min: 20 }).withMessage('La descripción de la categoría debe tener, al menos, 20 caracteres'),
    body('foto').notEmpty().withMessage('Debes ingresar una imagen para la categoría')

        .custom((value,{req}) =>{
            let file = req.file
            let acceptedExtensions = ['.jpg','.png','.jpeg','.gif']

            if(!file){
                throw new Error('El producto debe tener una imagen')
            }else{
                let fileExtension = path.extname(file.originalname)
                if(!acceptedExtensions.includes(fileExtension)) {
                    throw new Error (`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
                }
            }
            return true
        }),
];