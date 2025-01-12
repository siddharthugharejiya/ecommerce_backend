const CategoryModel = require("../Model/Catrgory_Model");
const UserModel = require("../Model/UserModel");
const jwt = require("jsonwebtoken")


const Form = async (req, res) => {
  try {
    const { username, email, password, role, secretkey } = req.body;
    
    
    if (role === "admin") {
      console.log(role);
      console.log(process.env.adminsecretkey)
      console.log(secretkey);
      if (process.env.adminsecretkey != secretkey) {
        return res.send({ msg: "You are not authorized" });
      }
      
    }


    const data = await UserModel.create(req.body);
    console.log(data);
    return res.send({ data })

  } catch (error) {
    console.log(error.message);
    
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body
   
     const userdata = await UserModel.findOne({ email });

    if (!userdata) {
      return res.send({ msg: "User Not register" })
    }
 
    const token = jwt.sign({ userId: userdata._id, userRole: userdata.role }, "SID")
    console.log(token);

    return res.send({ msg: "user login successfully" , token : token })
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