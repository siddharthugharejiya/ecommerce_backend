const CategoryModel = require("../Model/Catrgory_Model");
const UserModel = require("../Model/UserModel");
const jwt = require("jsonwebtoken")


const Form = async (req, res) => {
  try {
    const { username, email, password, role, secretkey } = req.body

    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(400).send({ data: "User already exists" });
    }

   
    if (role === "admin") {
      if (process.env.ADMIN_SECRET_KEY !== secretkey) {
        return res.status(403).send({ data: "You are not authorized" });
      }
    }

    
    const newUser = await UserModel.create({ username, email, password, role });
    return res.status(201).send({ data: "User created successfully", data: newUser });

  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ data: "An error occurred", error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body
   
     const userdata = await UserModel.findOne({ email });

    if (!userdata) {
      return res.send({ data : "User Not register" })
    }
 
    const token = jwt.sign({ userId: userdata._id, userRole: userdata.role }, "SID")
    console.log(token);

    return res.send({ data: "user login successfully" , token : token })
  }
  catch (error) {
    console.log(error);

  }
}
const login_Get = async(req,res) =>{
    const data = await UserModel.find()
    // console.log(data)
    res.send({data})
    
}
const getall_data = async (req, res) => {
  const data = await CategoryModel.find().populate("categoryes")
  // console.log(data)
  res.send({ data })

}
module.exports = { Form, getall_data, login , login_Get }