const express = require('express')
const { Form, getall_data, login, login_Get } = require('../Controller/UserController')
const UserRoute = express.Router()
UserRoute.post("/form",Form)
UserRoute.post("/login",login)
UserRoute.get("/login",login_Get)
UserRoute.get("/getall",getall_data)
module.exports=UserRoute