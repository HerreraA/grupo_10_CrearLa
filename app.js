const express = require ('express');
const { get } = require('http');
const app = express();
const path = require('path');

app.listen (3500, () => console.log('Alta de servidor: http://localhost:3500'));

app.use(express.static('public'));

app.get ('/', (req, res) => {
    let htmlPath = path.resolve(__dirname, './views/home.html');
    res.sendFile (htmlPath)
})

<<<<<<< HEAD
app.get('/register', (req,res)=> {
    res.sendFile(path.join(__dirname, './views/register.html'))
=======
app.get('/carrito.html',(rew, res) => {
    let htmlPath = path.resolve(__dirname, './views/carrito.html')
    res.sendFile(htmlPath)
>>>>>>> 803a3ad265dc6ad73d602f4e108b24adb1c433d0
})