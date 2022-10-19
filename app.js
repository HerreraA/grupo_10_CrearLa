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

app.get ('/register.html', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/register.html');
    res.sendFile (htmlPath)
})

app.get('/carrito.html',(req, res) => {
    let htmlPath = path.resolve(__dirname, './views/carrito.html')
    res.sendFile(htmlPath) })

    
app.get ('/product.html', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/product.html');
    res.sendFile (htmlPath)
})

app.get ('/contact.html', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/contact.html');
     res.sendFile (htmlPath)
})

app.get ('/login.html', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/login.html');
     res.sendFile (htmlPath)
})