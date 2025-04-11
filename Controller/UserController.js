
const jwt = require('jsonwebtoken');
const UserModel = require('../Model/UserModel');


const bcrypt = require('bcryptjs')

const Form = async (req, res) => {
  try {
    const { username, email, password, role, secretkey } = req.body;

    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(400).send({ data: "User already exists" });
    }

    if (role === "admin" && process.env.ADMIN_SECRET_KEY !== secretkey) {
      return res.status(403).send({ data: "You are not authorized" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ username, email, password: hashedPassword, role });

    return res.status(201).send({ data: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ data: "An error occurred", error: error.message });
  }
};

 const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userdata = await UserModel.findOne({ email })

    if (!userdata) {
      return res.status(404).send({ data: "User not registered" });
    }

    const isPasswordValid = await bcrypt.compare(password, userdata.password);

    if (!isPasswordValid) {
      return res.status(401).send({ data: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: userdata._id, userRole: userdata.role }, "SID");

    return res.status(200).send({ data: "User login successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: "An error occurred", error: error.message });
  }
};


const login_Get = async (req, res) => {
  const data = await UserModel.find();
  res.send({ data });
};


module.exports = { Form, login, login_Get };
