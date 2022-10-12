const express = require ('express');
const { get } = require('http');
const app = express();
const path = require('path');

app.listen (3500, () => console.log('Alta de servidor: http://localhost:3500'));

app.use(express.static('public'));

app.get ('/', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/index.html');
    res.sendFile (htmlPath)
})

app.get('/carrito.html',(rew, res) => {
    let htmlPath = path.resolve(__dirname, './views/carrito.html')
    res.sendFile(htmlPath)
})