const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/HeadphoneOrder", )
mongoose.connect(process.env.MONGODB_URI, )
.then(()=>{
    console.log('connection successful')
}).catch((err)=>{
    console.log("connection unsuccessful")
});
