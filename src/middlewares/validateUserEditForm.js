const { body } = require('express-validator')
const path = require('path')

module.exports =[
    body('nombre')
        .notEmpty().withMessage('Debes ingresar el nombre del usuario').bail()
        .isLength({ min: 3 }).withMessage('El nombre del usuario debe tener, al menos, 3 caracteres'),
   
    body('domicilio')
        .notEmpty().withMessage('Debes ingresar la direccion del usuario').bail()
        .isLength({ min: 10 }).withMessage('La direccion del usuario debe tener, al menos, 10 caracteres'),
        body('foto')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png','.gif', '.bmp', '.tiff'];
    
            if (!file) {
                throw new Error ('Debes seleccionar una imagen para el usuario');
            }
            else {
                let fileExtension = path.extname(file.originalname);                
                if(!acceptedExtensions.includes(fileExtension)) {
                    throw new Error (`Las extensiones de archivos permitidas son (${acceptedExtensions.join(', ')})`);
                }
            }
            return true;
    }),
   
]