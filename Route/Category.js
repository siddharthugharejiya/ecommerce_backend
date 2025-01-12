const {Router} = require('express')
const {category_add, getCategory }= require('../Controller/category_controller')

const Category_Router = Router()

Category_Router.post("/category",category_add)
Category_Router.get("/getCategory", getCategory)

module.exports = Category_Router