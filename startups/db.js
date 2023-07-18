const mongoose = require('mongoose');
require('dotenv').config();
const connectionurl = process.env.connectionurl;
const url = connectionurl;
module.exports = function() {
    mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true }).then(()=>{
        console.log('database connected successfully')
    }).catch(()=>{
        console.log('Unable to connect database!!');
    });
}
