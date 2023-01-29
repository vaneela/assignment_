const mongoose = require('mongoose');

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    } catch (error) {
        console.log(error); 
    }
}

module.exports=ConnectDB;