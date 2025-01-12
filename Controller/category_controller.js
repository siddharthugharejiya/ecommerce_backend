const CategoryModel = require("../Model/Catrgory_Model")

const category_add = async(req,res)=>{
    try {
           
        const data = await CategoryModel.create(req.body)
        // console.log(data)
        res.send({data})
    }
        catch (error) {
     res.send({msg : error.massage})   
    }
}
const getCategory = async(req,res) =>{
    try {
        const data = await CategoryModel.find()
        res.send({data})
    } catch (error) {
        console.log(error.massage);
        
    }
}
module.exports = {category_add, getCategory}