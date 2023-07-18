const mongoose = require('mongoose');
const url = 'mongodb+srv://blog-db-user:OF1c1wXt0BJTNZWb@blog-db.73mvi.mongodb.net/?retryWrites=true&w=majority';
module.exports = function() {
    mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true }).then(()=>{
        console.log('database connected successfully')
    }).catch(()=>{
        console.log('Unable to connect database!!');
    });
}
