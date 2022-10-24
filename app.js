const express = require ('express');
const { get } = require('http');
const app = express();
const path = require('path');


const publicPath= path.resolve(__dirname, "./public");

app.use(express.static(publicPath))

app.listen (3500, () => console.log('Alta de servidor: http://localhost:3500'));

app.get ('/', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/home.html');
    res.sendFile (htmlPath)
})

app.get ('/register', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/users/register.html');
    res.sendFile (htmlPath)
})

app.get('/carrito',(req, res) => {
    let htmlPath = path.resolve(__dirname, './views/carrito.html')
    res.sendFile(htmlPath) })

    
app.get ('/product', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/product.html');
    res.sendFile (htmlPath)
})

app.get ('/contact', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/contact.html');
     res.sendFile (htmlPath)
})

app.get ('/login', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/users/login.html');
     res.sendFile (htmlPath)
})