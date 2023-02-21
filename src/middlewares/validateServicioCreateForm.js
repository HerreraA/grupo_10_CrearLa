const { body } = require('express-validator')
const path = require('path')

module.exports=[
    body('nombre')
    .notEmpty().withMessage('Debes ingresar el nombre del servicio').bail()
    .isLength({ min: 5 }).withMessage('El nombre del servicio debe tener, al menos, 5 caracteres'), 
body('categoria')
    .notEmpty().withMessage('Debes seleccionar la categoría del servicio'),
body('description')
    .notEmpty().withMessage('Debes ingresar la descripcion del servicio').bail()
    .isLength({ min: 20 }).withMessage('La descripción del servicio debe tener, al menos, 20 caracteres'),
body('foto')
    .custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png','.gif', '.bmp', '.tiff'];

        if (!file) {
            throw new Error ('Debes seleccionar una imagen para el servicio');
        }
        else {
            let fileExtension = path.extname(file.originalname);                
            if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivos permitidas son (${acceptedExtensions.join(', ')})`);
            }
        }
        return true;
}),
body('precio')
    .notEmpty().withMessage('Debes ingresar el precio del servicio')
]