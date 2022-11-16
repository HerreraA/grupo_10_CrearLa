// ************ Require's ************
const express = require ('express');
const { get } = require('http');
const path = require('path');
const productsRouter = require ("./routes/products")
const mainRouter = require ('./routes/main')
const usersRouter = require ('./routes/users')
const productsController = require ("./controllers/productsController")

// ************ express() - (don't touch) ************
const app = express();
const publicPath= path.resolve(__dirname, "./public");

// ************ Middlewares - (don't touch) ************
app.use(express.static(publicPath))
app.set('views', path.join(__dirname, '/views'))

// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");


app.use ('/', mainRouter)

app.use ('/products/', productsRouter)

app.use ('/user', usersRouter)



app.listen (3500, () => console.log('Alta de servidor: http://localhost:3500'));