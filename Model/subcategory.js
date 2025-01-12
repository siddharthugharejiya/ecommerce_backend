const mongoose = require('mongoose')
const Subcategory_Schema = mongoose.Schema({
    name : String
}) 
const Subcategory_Model = mongoose.model("subcategory",Subcategory_Schema)
module.exports = Subcategory_Model