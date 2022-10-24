const express = require ('express');
const { get } = require('http');
const app = express();
const path = require('path');


const publicPath= path.resolve(__dirname, "./public");

app.use(express.static(publicPath))

app.listen (3500, () => console.log('Alta de servidor: http://localhost:3500'));

app.get ('/', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/home.ejs');
    res.render (htmlPath)
})

app.get ('/register', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/users/register.ejs');
    res.render (htmlPath)
})

app.get('/carrito',(req, res) => {
    let htmlPath = path.resolve(__dirname, './views/carrito.ejs')
    res.render(htmlPath) })

    
app.get ('/product', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/product.ejs');
    res.render (htmlPath)
})

app.get ('/contact', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/contact.ejs');
     res.render (htmlPath)
})

app.get ('/login', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/users/login.ejs');
     res.render (htmlPath)
})