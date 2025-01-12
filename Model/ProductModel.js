const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    adminId : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "subcategory" }
})
const ProductModel = mongoose.model("product", productSchema)
module.exports = ProductModel