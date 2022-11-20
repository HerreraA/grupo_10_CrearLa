// ************ Require's ************
const express = require ('express');
const { get } = require('http');
const path = require('path');
const methodOverride = require('method-override'); // para usar metodos PUT y DELETE 


// ************ express() - (don't touch) ************
const app = express();


// ************ Middlewares - (don't touch) ************
const publicPath= path.resolve(__dirname, "./public"); 
app.use(express.static(publicPath))
app.use(express.urlencoded({extended: false})); // para poder enviar y ver los datos despues de dar al boton "SUBMIT"
app.use(express.json());
app.use(methodOverride('_method')) // para poder reemplazar el method="POST" por PUT y DELETE



// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'))



//* Sistema de rutas *//
const mainRouter = require ('./routes/main');
const productsRouter = require ("./routes/products");
const usersRouter = require ('./routes/users');


app.use ('/', mainRouter)

app.use ('/products/', productsRouter)

app.use ('/user', usersRouter)



//* Servidor */

app.listen (3500, () => console.log('Alta de servidor: http://localhost:3500'));