const {Router} = require('express')
const { subcategory_controller, subcategory_get } = require('../Controller/subcategory_controller')
const Subcategory = Router()
 
Subcategory.post("/subcategory",subcategory_controller)
Subcategory.get("/subget",subcategory_get)
module.exports = Subcategory