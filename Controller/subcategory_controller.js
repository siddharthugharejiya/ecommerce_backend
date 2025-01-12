const Subcategory_Model = require("../Model/subcategory")

const subcategory_controller = async(req,res) =>{
        const data = await Subcategory_Model.create(req.body)
        // console.log(data);
        res.send({data}) 
}
const subcategory_get = async(req,res) =>{
        const data =  await Subcategory_Model.find()
        // console.log(data);
        res.send({data})
        
}

module.exports={ subcategory_controller,subcategory_get}