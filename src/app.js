require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');

const port = process.env.PORT || 8000;
const app = express();

// including database connection
require('./db/conn');
const Registration = require("./models/registration");
const { Console } = require('console');

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views",templatePath); 
hbs.registerPartials(partialsPath);  


app.get('/',(req,res)=>{
    res.render("index");
});

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/contact',(req,res)=>{
    res.render('contact');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/register',(req,res)=>{
    res.render('register');
});

app.get('/product',(req,res)=>{
    res.render('product');
});

app.get('/logout', auth, async(req,res)=>{
    try{
        // For single user logout
        // req.user.tokens = req.user.tokens.filter(curElement => {if(curElement.token!=req.token) return curElement;});
        
        //logout from all devices
        req.user.tokens=[];
        res.clearCookie("jwt");
        console.log("logged out");
        await req.user.save();
        res.render('logout');
        
    }catch(err){
        res.status(500).send(err);
    }
});

app.post('/register',async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        
        if(password===cpassword){
            const customerRegistration = new Registration({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                phone:req.body.phone,
                address:req.body.address,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            });
            const token = await customerRegistration.generateAuthToken();        
            console.log("here");
            res.cookie('jwt',token,{
                httpOnly:true
            });
           
            const registered = await customerRegistration.save();
            console.log("Registration Successfull");
            res.status(201).render('login');

        }else{
            res.send("password not matching");
        }
    }catch(err){
        res.status(400).send(`error occurred-> ${err} `);
    }
});

app.post('/login', async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Registration.findOne({email:email});
        const isMatch = await bcrypt.compare(password, useremail.password);
        const token = await useremail.generateAuthToken();
        res.cookie('jwt', token,{
            httpOnly:true
        });

        if(isMatch){
            res.status(201).render('product');
        }else{
            res.send('invalid login credentials');
        }
    }catch(err){
        res.status(400).send("Invalid login credentials");
    }
});

app.listen(port || 10000,()=>{
    console.log(`listening on port ${port} `);
})