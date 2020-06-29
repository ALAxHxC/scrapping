const mongoose = require('mongoose');
const searchSchema  = new mongoose.Schema({
    search: {type:String,index:true},
    title:{type:String},
    description:{type:String},
    link:{type:String},
    image:{type:String}, 
    fuente: {type:String}, 
    price:{type:Number}  
},{
    timestamps:true
});
module.exports.searchModel = mongoose.model('search', searchSchema );