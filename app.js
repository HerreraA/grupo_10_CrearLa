// ************ Require's ************
const express = require ('express');
const path = require('path');
const { get } = require('http');
const methodOverride = require ('method-override'); // para poder usar PUT y DELETE


// ************ express() - (don't touch) ************
const app = express();


// ************ Middlewares - (don't touch) ************
const publicPath= path.resolve(__dirname, "./public");
app.use(express.static(publicPath))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method')); // para poder pisar el metodo POST en el formulario por PUT y DELETE


// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'))


//** Rutas */
const mainRouter = require ('./routes/main')
const categoriesRouter = require ("./routes/categories")
const productsRouter = require ("./routes/products")
const usersRouter = require ('./routes/users')

app.use ('/', mainRouter);
app.use ('/categories', categoriesRouter);
app.use ('/products', productsRouter);
app.use ('/user', usersRouter);

// Página no encontrada
app.use(async(req, res, next) => {
    res.status(404).render('notfound/notFound');
})

// ********* Creando servidor ***********
const port = process.env.PORT || 3500;
app.listen (port, () => { console.log('Alta de servidor: http://localhost:$ {port}');})

