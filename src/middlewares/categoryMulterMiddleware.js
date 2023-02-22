const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/categorias');
	},
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_category${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadFile = multer({ storage: storage });

module.exports = uploadFile;