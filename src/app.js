const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();

const staticPath = path.join(__dirname, "../public");


app.use(express.static(staticPath));


app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/about',(req,res)=>{
    res.sendfile('public/about.html');
});

app.get('/contact',(req,res)=>{
    res.sendfile('public/contact.html');
});

app.get('/login',(req,res)=>{
    res.sendfile('public/login.html');
});

app.get('/register',(req,res)=>{
    res.sendfile('public/register.html');
});

app.get('/product',(req,res)=>{
    res.sendfile('public/product.html');
});

app.listen(port,()=>{
    console.log(`listening on port ${port} `);
})