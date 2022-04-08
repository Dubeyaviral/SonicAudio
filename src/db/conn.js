const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/HeadphoneOrder", )
.then(()=>{
    console.log('connection successful')
}).catch((err)=>{
    console.log("connection unsuccessful")
});
