// ************ Require's ************
const express = require ('express');
const { get } = require('http');
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE


// ************ express() - (don't touch) ************
const app = express();



const publicPath= path.resolve(__dirname, "./public");

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, './public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");


const mainRouter = require ('./routes/main')
const productsRouter = require ("./routes/productsRouter")
const usersRouter = require ('./routes/users')

app.use ('/', mainRouter)
app.use ('/products', productsRouter)
app.use ('/user', usersRouter)



app.listen (3500, () => console.log('Alta de servidor: http://localhost:3500'));