

const mongoose = require('mongoose')

const cartschem = mongoose.Schema({
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity : {type : Number},
        description: { type: String, required: true },
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product"},
        subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "subcategory" }

}
)
const CartModel = mongoose.model('cart', cartschem)
module.exports = CartModel