const mongoose  = require("mongoose");
var Employee = mongoose.model('Employee',{
    name: {type:String},
    position:{type:String},
    Branch:{type:String},
    salary:{type:Number}
});// create Model/Collection with name
module.exports = { Employee };// it's collection