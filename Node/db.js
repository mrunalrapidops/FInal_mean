const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/employee_db",{ useNewUrlParser: true },(err)=>{
    if(!err){
        console.log("Connection to employee_db succeeded");
    }
    else{
        console.log("Connection to employee_db NOT succeeded:" + JSON.stringify(err,undefined,2));
    }
});
module.exports = mongoose;