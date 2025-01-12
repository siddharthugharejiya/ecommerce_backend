const mongoose = require('mongoose')
const Server = async() =>{
    await mongoose.connect(process.env.MONGOOSE)
    console.log("Server is connected")
}
module.exports=Server