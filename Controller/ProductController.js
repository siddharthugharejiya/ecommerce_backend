
const ProductModel = require("../Model/ProductModel");
const CartModel = require("../Model/CartModel");

const addproduct = async (req, res) => {
  try {
    const { name, image, price, description, category, subcategory } = req.body;
    const product = {
      name,
      image,
      price,
      description,
      category,
      subcategory,
      adminId: req.user.id,
    };
   
    const data = await ProductModel.create(product);
   const userRole = req.user.userRole
    res.status(201).send({ data,userRole })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
};

const Getproduct = async (req, res) => {
  try {
    
    const data = await ProductModel.find() 
   return res.status(200).send({ data })
  } catch (error) {
   return res.status(400).send({ message: error.message });
  }
}
const del = async (req, res) => {
  try {
    const { id } = req.params
    const data = await ProductModel.findByIdAndDelete(id)
    res.send({ data })
  } catch (error) {
    console.log(error);

  }
}
const edite = async (req, res) => {
  try {
    const { id } = req.params
    const data = await ProductModel.findById(id)
    // console.log(data);
      res.send({ data })
  } catch (error) {
    console.log(error);

  }
}
const edite_post = async (req, res) => {
  try {
    const { id } = req.params
    const data = await ProductModel.findByIdAndUpdate(id, req.body)
    res.send({ data })
  } catch (error) {

  }
}
const cart = async (req,res) =>{
  try {
    const cartItems = await CartModel.find()
    res.status(200).send({ cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).send({ message: error.message });
  }
}
const cart_del = async (req,res) =>{
  try {
    const { id } = req.params;
    console.log("this is bakend id ",id);
    
    const data = await CartModel.findByIdAndDelete(id);
    
    if (!data) {
      return res.status(404).send({ message: "Item not found" });
    }

    res.status(200).send({ message: "Item deleted successfully", data });
  } catch (error) {
    res.status(500).send({ message: error.message });

  }
}
const cart_post = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  try {
   

    const existingCartItem = await CartModel.findOne({ userId: id, productId: product._id });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      return res.json(existingCartItem);
    } else {
      const newCartItem = new CartModel({
        userId: id,
        image: product.image,
        description: product.description,
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
      await newCartItem.save();
      return res.json(newCartItem);
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const singledata = async(req,res) =>{
  const { id } = req.params;
  try {
      const data = await ProductModel.findById(id);
      if (!data) {
          return res.status(404).send({ message: "Product not found" });
      }
      res.send({ data });
  } catch (error) {
      res.status(500).send({ message: "Server error" });
  }
}

module.exports = { addproduct, Getproduct, del, edite, edite_post, cart_post , singledata,cart,cart_del}
