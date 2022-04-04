const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();

const staticPath = path.join(__dirname, "../public");

app.use(express.static(staticPath));


app.get('/',(req,res)=>{
    res.render('index');
});

app.listen(port,()=>{
    console.log(`listening on port ${port} `);
})